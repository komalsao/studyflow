import { extractText } from "./document/documentService.js";
import { createChunks } from "./chunkService.js";
import {
    generateSessionTitle as generateTitleWithGemini,
    generateStudyResources as generateResourcesWithGemini,
} from "./aiGenerationService.js";

async function extractStudyText(fileBuffer, mimeType) {

    const text = await extractText(fileBuffer, mimeType);

    if (!text.trim()) {
        throw new Error("No readable text was found in the uploaded file.");
    }

    return text;

}

export async function generateSessionTitle(fileBuffer, mimeType) {

    const text = await extractStudyText(fileBuffer, mimeType);

    return generateTitleWithGemini(text);

}

export async function generateStudyResources(fileBuffer, mimeType) {

    const text = await extractStudyText(fileBuffer, mimeType);

    const chunks = createChunks(text);

    return generateResourcesWithGemini(chunks);
}
