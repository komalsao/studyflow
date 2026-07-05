import "./TipCard.css";
import { Lightbulb, Leaf } from "lucide-react";
import bulb from "../../assets/lumi/lightbulb.svg";

function MessageFromLumi() {
    return (
        <div className="tip-card">

            <div className="tip-left">

                <div className="tip-header">
                    <h3>🌿 Tip from Lumi</h3>
                </div>

                <div className="tip-text">

                    <span className="quote-mark start">❝</span>

                    <p>
                        Small daily revisions are more effective than
                        last-minute cramming.
                    </p>

                    <span className="quote-mark end">❞</span>

                </div>

            </div>

            <div className="tip-right">

                <img
                    src={bulb}
                    alt="Light Bulb"
                    className="tip-bulb"
                />



            </div>

        </div>
    );
}

export default MessageFromLumi;