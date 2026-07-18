import "./ChatMessages.css";
import ReactMarkdown from "react-markdown";

import LumiAvatar from "../../../../assets/lumi/wave.png";

function MessageBubble({

    sender,
    message

}) {

    return (

        <div className={`message-row ${sender}`}>

            {sender === "lumi" && (

                <img
                    src={LumiAvatar}
                    alt="Lumi"
                    className="message-avatar"
                />

            )}

            <div className="message-bubble">

                <ReactMarkdown>
                    {message}
                </ReactMarkdown>

            </div>

        </div>

    );

}

export default MessageBubble;