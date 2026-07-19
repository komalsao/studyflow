import "./ChatLoading.css";

import lumi from "../../../../assets/lumi/peek.png";

function ChatLoading() {

    return (

        <div className="chat-loading">

            <img
                src={lumi}
                alt="Lumi"
                className="chat-loading-lumi"
            />

            <div className="chat-loading-card">

                <div className="chat-loading-spinner"></div>

                <h3>Restoring your conversation...</h3>

                <p>
                    Just a moment while I bring back everything
                    you and I talked about.
                </p>

            </div>

        </div>

    );

}

export default ChatLoading;