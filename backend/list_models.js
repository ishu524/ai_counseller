require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The listModels method is not directly on genAI in this version of SDK sometimes.
        // Let's try to see if it even connects with a known good model like 'gemini-1.5-flash-latest'
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Success!");
    } catch (error) {
        console.error("Model Error:", error.message);
        if (error.response) console.error("Response:", error.response.status, error.response.statusText);
    }
}

listModels();
