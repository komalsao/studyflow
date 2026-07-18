import { generateResponse } from "../services/geminiService.js";

export async function chat(req, res) {

    try {

        const { prompt, resources } = req.body;

        if (!prompt) {

            return res.status(400).json({
                success: false,
                error: "Prompt is required."
            });

        }

        const answer = await generateResponse(
            prompt,
            resources || {}
        );

        res.json({
            success: true,
            response: answer
        });

    } catch (error) {

        console.error(error);

        if (error.status === 429) {

            return res.status(429).json({
                success: false,
                error: "Lumi is receiving a lot of requests right now. Please wait a moment and try again."
            });

        }

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

}