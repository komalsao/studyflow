const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/chat`;

export async function sendMessage(prompt, resources) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt,
            resources
        })

    });

    const data = await response.json();

    if (!response.ok || !data.success) {

        throw new Error(data.error || "Something went wrong.");

    }

    return data.response;

}