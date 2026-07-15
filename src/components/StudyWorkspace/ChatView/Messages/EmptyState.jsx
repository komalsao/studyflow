import "./ChatMessages.css";

import Lumi from "../../../../assets/lumi/chat.png";

function EmptyState() {

    return (

        <div className="chat-empty-state">

            <img
                src={Lumi}
                alt="Lumi"
                className="empty-lumi"
            />

            <h2>Hi, I'm Lumi!</h2>

            <p>
                I'm here whenever you need help with your study materials.
                <br />Ask me anything below.
            </p>

        </div>

    );

}

export default EmptyState;