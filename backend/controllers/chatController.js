const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create the model
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: "You are Neo, an intelligent and helpful AI assistant designed for students and youth. Your primary goal is to provide clear, practical, real-time solutions to their questions. You can assist with tasks like creating timetables, explaining concepts, organizing schedules, and answering general queries. While you should be polite and supportive, do not overly focus on their emotional state unless they explicitly ask for emotional support. Be direct, structured, and highly practical."
});

// @desc    Send a message and get AI response
// @route   POST /api/chat/send
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!text) {
            return res.status(400).json({ message: 'Please provide a message text' });
        }

        // Find or create chat document for user
        let chat = await Chat.findOne({ userId });
        
        if (!chat) {
            chat = new Chat({ userId, messages: [] });
        }

        // Add user message to DB first
        const userMessage = {
            role: 'user',
            text: text,
            timestamp: new Date()
        };
        chat.messages.push(userMessage);

        // Map DB history to Gemini history format
        const history = chat.messages
            .slice(0, -1) // Exclude the message we just added
            .map(msg => ({
                role: msg.role === 'neo' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));

        // Start a chat session with the formatted history
        const chatSession = model.startChat({
            history: history,
        });

        // Send the new message to Gemini
        const result = await chatSession.sendMessage(text);
        const neoText = result.response.text();

        // Save Neo's response to DB
        const neoMessage = {
            role: 'neo',
            text: neoText,
            timestamp: new Date()
        };
        chat.messages.push(neoMessage);

        // Save chat history
        await chat.save();

        res.status(200).json({ 
            userMessage,
            neoMessage
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error while sending message' });
    }
};

// @desc    Get chat history
// @route   GET /api/chat/history/:userId
// @access  Private
const getChatHistory = async (req, res) => {
    try {
        const requestedUserId = req.params.userId;
        
        // Basic authorization check: users can only see their own history
        if (req.user.id !== requestedUserId) {
            return res.status(403).json({ message: 'Not authorized to view this chat' });
        }

        const chat = await Chat.findOne({ userId: requestedUserId });

        if (!chat) {
            return res.status(200).json({ messages: [] });
        }

        res.status(200).json({ messages: chat.messages });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error while fetching chat history' });
    }
};

module.exports = {
    sendMessage,
    getChatHistory
};
