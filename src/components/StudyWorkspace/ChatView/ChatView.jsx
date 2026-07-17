import "./ChatView.css";
import { useState } from "react";
import ChatMessages from "./Messages/ChatMessages";
import ChatInput from "../Shared/ChatInput/ChatInput";

function ChatView() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    function handleSend(text) {

        if (!text.trim()) return;

        setMessages(prev => [

            ...prev,

            {

                sender: "user",

                text

            }

        ]);

        setIsTyping(true);

        setTimeout(() => {

            setMessages(prev => [

                ...prev,

                {

                    sender: "lumi",

                    text: "This is a demo response. We'll connect Gemini later."

                }

            ]);

            setIsTyping(false);

        }, 1500);

    }

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

                    />

                </div>


            </div>

        </div>
    );

}

export default ChatView;
