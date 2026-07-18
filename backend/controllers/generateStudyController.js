import { downloadFile } from "../services/document/downloadFile.js";
import {
    generateSessionTitle as createSessionTitle,
    generateStudyResources as createStudyResources,
} from "../services/studyGenerationService.js";

async function getStudyFile(req, res) {

    const { downloadURL, mimeType } = req.body;

    if (!downloadURL || !mimeType) {

        res.status(400).json({
            success: false,
            error: "downloadURL and mimeType are required."
        });

        return null;

    }

    return {
        fileBuffer: await downloadFile(downloadURL),
        mimeType,
    };

}

export async function generateStudyTitle(req, res) {

    try {

        const studyFile = await getStudyFile(req, res);

        if (!studyFile) {
            return;
        }

        const title = await createSessionTitle(
            studyFile.fileBuffer,
            studyFile.mimeType
        );

        res.json({
            success: true,
            title,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }

}

export async function generateStudyResources(req, res) {

    try {

        const studyFile = await getStudyFile(req, res);

        if (!studyFile) {
            return;
        }

        const resources = await createStudyResources(
            studyFile.fileBuffer,
            studyFile.mimeType
        );

        res.json({
            success: true,
            resources,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
        });

    }

}
