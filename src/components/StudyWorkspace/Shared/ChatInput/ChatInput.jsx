import "./ChatInput.css";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

function ChatInput({ setActiveView }) {

    const openChat = () => {
        setActiveView("chat");
    };
    const [message, setMessage] = useState("");


    return (

        <div className="chat-launcher">

            

            <div
                className="chat-box"
                onClick={openChat}
            >

                <button className="chat-icon">

                    <Paperclip size={20} />

                </button>

                <input
                    type="text"
                    value={message}
                    placeholder="Ask Lumi anything about your study materials..."
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setActiveView("chat");
                    }}
                />


                <button className="chat-send">

                    <Send size={18} />

                </button>

            </div>

        </div>

    );

}

export default ChatInput;