import { extractPdfText } from "./pdfExtractor.js";
import { extractDocxText } from "./docxExtractor.js";
import { extractTxtText } from "./txtExtractor.js";

export async function extractText(fileBuffer, mimeType) {

    switch (mimeType) {

        case "application/pdf":
            return extractPdfText(fileBuffer);

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return extractDocxText(fileBuffer);

        case "text/plain":
            return extractTxtText(fileBuffer);

        default:
            throw new Error("Unsupported file type.");
    }

}