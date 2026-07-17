const API_URL = "http://localhost:3001/api/chat";

export async function sendMessage(prompt) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt
        })

    });

    const data = await response.json();

    if (!response.ok || !data.success) {

        throw new Error(data.error || "Something went wrong.");

    }

    return data.response;

}