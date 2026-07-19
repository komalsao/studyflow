import "./ChatInput.css";

import { Paperclip, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function ChatInput({

    setActiveView,
    onSend,
    autoFocus = false,
    disabled = false

}) {

    const [message, setMessage] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {

        if (autoFocus) {

            inputRef.current?.focus();

        }

    }, [autoFocus]);

    function handleSend() {

        if (disabled) return;

        const text = message.trim();

        if (!text) return;

        if (onSend) {

            onSend(text);

            setMessage("");

            inputRef.current?.focus();

        }

    }

    function handleBoxClick() {

        inputRef.current?.focus();

        if (setActiveView) {

            setActiveView("chat");

        }

    }

    function handleKeyDown(e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();

        }

    }

    return (

        <div className="chat-launcher">

            <div
                className="chat-box"
                onClick={handleBoxClick}
            >

                <button
                    className="chat-icon"
                    type="button"
                >

                    <Paperclip size={20} />

                </button>

                <input

                    ref={inputRef}

                    type="text"

                    value={message}

                    placeholder="Ask Lumi anything about your study materials..."

                    onChange={(e) => setMessage(e.target.value)}

                    onKeyDown={handleKeyDown}

                />

                <button

                    className="chat-send"

                    type="button"

                    disabled={disabled || !message.trim()}

                    onClick={(e) => {

                        e.stopPropagation();

                        handleSend();

                    }}

                >

                    {disabled ? (

                        <div className="chat-send-spinner"></div>

                    ) : (

                        <Send size={18} />

                    )}

                </button>

            </div>

        </div>

    );

}

export default ChatInput;