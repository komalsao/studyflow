export async function downloadFile(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to download file.");
    }

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
}