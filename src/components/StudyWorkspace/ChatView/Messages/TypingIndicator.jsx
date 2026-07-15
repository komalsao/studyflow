import "./ChatMessages.css";

import LumiAvatar from "../../../../assets/lumi/wave.png";

function TypingIndicator() {

    return (

        <div className="message-row lumi">

            <img
                src={LumiAvatar}
                alt="Lumi"
                className="message-avatar"
            />

            <div className="typing-bubble">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    );

}

export default TypingIndicator;