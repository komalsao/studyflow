import dotenv from "dotenv";
import { systemPrompt } from "../prompts/systemPrompt.js";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt, context) {

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: `
                 ${systemPrompt}

                 Study Material Context:

                 ${JSON.stringify(context, null, 2)}

                 Student Question:

                 ${prompt}

                 Lumi:`
    });

    return response.text;
}