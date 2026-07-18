export function createChunks(text, chunkSize = 1200, overlap = 200) {

    const chunks = [];

    let start = 0;

    while (start < text.length) {

        const end = start + chunkSize;

        chunks.push({

            index: chunks.length,

            text: text.slice(start, end).trim(),

        });

        start += chunkSize - overlap;
    }

    return chunks;
}