require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testV1() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey, { apiVersion: 'v1' });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hi");
        console.log("Success with v1!");
    } catch (e) {
        console.error("V1 Failed:", e.message);
        
        try {
            const genAIBeta = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const modelBeta = genAIBeta.getGenerativeModel({ model: "gemini-1.5-flash" });
            const resultBeta = await modelBeta.generateContent("hi");
            console.log("Success with v1beta!");
        } catch (e2) {
            console.error("V1Beta also Failed:", e2.message);
        }
    }
}

testV1();
