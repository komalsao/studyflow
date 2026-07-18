import "./ChatView.css";
import { useEffect, useRef, useState } from "react";
import ChatMessages from "./Messages/ChatMessages";
import ChatInput from "../Shared/ChatInput/ChatInput";
import { sendMessage } from "../../../services/chatService";
import { useLocation, useNavigate } from "react-router-dom";

function ChatView({ session, autoPrompt }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handledPrompt = useRef(null);



    async function handleSend(text) {

        if (!text.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text
            }
        ]);

        setIsTyping(true);

        try {

            const reply = await sendMessage(
                text,
                session?.resources
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "lumi",
                    text: reply
                }
            ]);

        } catch (error) {

            let message =
                "Something went wrong. Please try again.";

            if (
                error.message.includes("503") ||
                error.message.includes("UNAVAILABLE")
            ) {

                message =
                    "I’m receiving a lot of requests right now. Give me a moment and try again in a little while. ";

            }

            setMessages((prev) => [
                ...prev,
                {
                    sender: "lumi",
                    text: message
                }
            ]);

        } finally {

            setIsTyping(false);

        }

    }

    useEffect(() => {

    const prompt = location.state?.autoPrompt;

    if (!prompt) return;

    if (handledPrompt.current === prompt) return;

    handledPrompt.current = prompt;

    handleSend(prompt);

    navigate(location.pathname, {
        replace: true,
        state: null,
    });

}, [location.state, session]);

    return (

        <div className="chat-view">



            <div className="chat-content">

                <ChatMessages

                    messages={messages}

                    isTyping={isTyping}

                />


                <div className="chat-input-wrapper">

                    <ChatInput
                        onSend={handleSend}
                        autoFocus
                        disabled={isTyping}
                    />

                </div>


            </div>

        </div>
    );

}

export default ChatView;
