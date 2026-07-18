export function askLumi({
    navigate,
    sessionId,
    prompt,
    source = "",
}) {

    if (!prompt) return;

    navigate(`/study-workspace/${sessionId}`, {
        state: {
            activeView: "chat",
            autoPrompt: prompt,
            source,
        },
    });

}