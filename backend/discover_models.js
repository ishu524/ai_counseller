require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Using API Key:", apiKey.substring(0, 8) + "...");
        
        // Literal fetch check
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        
        if (data.error) {
            console.error("API Error:", data.error.message);
            return;
        }
        
        console.log("Available Models:");
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent')) {
                console.log(`- ${m.name}`);
            }
        });
    } catch (error) {
        console.error("Script Error:", error.message);
    }
}

checkModels();
