require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Try multiple fallback models
        const models = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
        for (const m of models) {
            console.log(`Trying ${m}...`);
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("hello");
                console.log(`Success with ${m}!`);
                return;
            } catch (e) {
                console.log(`Failed ${m}: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("Critical Test Error:", error.message);
    }
}

testGemini();
