const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// We will discover multiple models to have fallbacks for 503/404 errors
let discoveredModels = [];

const discoverBestModels = async () => {
    try {
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = response.data;

        if (data.models) {
            // Priority list for sorting
            const PRIORITY = ["1.5-flash", "flash-latest", "pro-latest", "1.5-pro", "gemini-pro"];
            
            discoveredModels = data.models
                .filter(m => m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name.replace('models/', ''))
                // Filter out experimental future models that are currently 404ing
                .filter(name => !name.includes('2.5') && !name.includes('3.'))
                .sort((a, b) => {
                    const aIdx = PRIORITY.findIndex(p => a.includes(p));
                    const bIdx = PRIORITY.findIndex(p => b.includes(p));
                    if (aIdx === -1) return 1;
                    if (bIdx === -1) return -1;
                    return aIdx - bIdx;
                });
            
            console.log(`🚀 AUTO-DISCOVERY: Initialized with ${discoveredModels.length} models. Primary: ${discoveredModels[0]}`);
        }
    } catch (err) {
        console.warn("Auto-discovery failed, using standard fallbacks:", err.message);
        discoveredModels = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
    }
};

// Initial discovery
discoverBestModels();

const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user?.id || "605c721c430e5218d867abc1";

        if (!text) {
            return res.status(400).json({ message: 'Please provide a message text' });
        }

        // Ensure we have models
        if (discoveredModels.length === 0) await discoverBestModels();

        let chat;
        try {
            chat = await Chat.findOne({ userId });
            if (!chat) chat = new Chat({ userId, messages: [] });
        } catch (e) {}

        const userMessage = { role: 'user', text, timestamp: new Date() };
        if (chat) chat.messages.push(userMessage);

        const history = chat ? chat.messages.slice(0, -1).map(msg => ({
            role: msg.role === 'neo' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        })) : [];

        let neoText;
        let success = false;
        let lastError = null;

        // MULTI-MODEL FAILOVER ENGINE
        for (const modelName of discoveredModels) {
            try {
                const model = genAI.getGenerativeModel({ 
                    model: modelName,
                    systemInstruction: "You are Neo, an advanced AI counsellor. Be empathetic and helpful."
                });
                const chatSession = model.startChat({ history });
                const result = await chatSession.sendMessage(text);
                neoText = result.response.text();
                success = true;
                console.log(`✅ Success with model: ${modelName}`);
                break;
            } catch (err) {
                lastError = err;
                const isRetryable = err.message.includes('404') || err.message.includes('503') || err.message.includes('500');
                
                if (isRetryable) {
                    console.warn(`⚠️ Model ${modelName} failed. Removing from active session...`);
                    // Permanent optimization: Remove this model from the list for the current server session
                    discoveredModels = discoveredModels.filter(m => m !== modelName);
                    continue; // Try the next model immediately
                }
                break; // Non-retryable error (like auth)
            }
        }

        if (!success) {
            return res.status(500).json({ 
                message: 'AI Service currently overloaded', 
                details: lastError?.message || "All models returned errors." 
            });
        }

        const neoMessage = { role: 'neo', text: neoText, timestamp: new Date() };
        if (chat) {
            chat.messages.push(neoMessage);
            try { await chat.save(); } catch (e) {}
        }

        res.status(200).json({ userMessage, neoMessage });

    } catch (error) {
        console.error('--- CHAT ERROR START ---');
        console.error('Models attempted:', discoveredModels);
        console.error('Message:', error.message);
        
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const chat = await Chat.findOne({ userId });
        res.status(200).json({ messages: chat ? chat.messages : [] });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

module.exports = { sendMessage, getChatHistory };
