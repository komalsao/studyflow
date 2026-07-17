import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt) {

    const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
        contents: prompt,
    });

    return response.text;
}