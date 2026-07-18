import mammoth from "mammoth";

export async function extractDocxText(fileBuffer) {

    const result = await mammoth.extractRawText({
        buffer: fileBuffer,
    });

    return result.value;
}