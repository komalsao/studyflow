import "./ChatMessages.css";

import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

function ChatMessages({

    messages,

    isTyping

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: messages.length > 1 ? "smooth" : "auto"

        });

    }, [messages, isTyping]);

    if (messages.length === 0) {

        return (

            <div className="chat-messages">

                <EmptyState />

            </div>

        );

    }

    return (

        <div className="chat-messages">

            {messages.map((message, index) => (

                <MessageBubble
                    key={index}
                    sender={message.sender}
                    message={message.text}
                />

            ))}

            {isTyping && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>

    );

}

export default ChatMessages;