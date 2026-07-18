import "./SessionDetails.css";
import { Lightbulb } from "lucide-react";

function SessionDetails({
    title,
    suggestedTitle,
    onTitleChange,
    onUseSuggestion,
}) {
    return (
        <section className="session-details">

            <h2>Session Details</h2>

            <p className="details-subtitle">
                Give your study session a name.
            </p>

            <div className="session-input-wrapper">

                <input
                    type="text"
                    placeholder="Eg. Operating Systems Midterm"
                    className="session-input"
                    value={title}
                    onChange={(event) => onTitleChange(event.target.value)}
                />

                <span className="character-count">
                    0 / 60
                </span>

            </div>

            <div className="lumi-suggestion">

                <div>
                    <Lightbulb size={18} color="#2E8B57"/>
                    <strong>Suggested by Lumi:</strong>
                    <span className="suggestion-name">
                        {" "}{suggestedTitle || "Generating a title..."}
                    </span>

                </div>

                <button
                    className="use-suggestion-btn"
                    onClick={onUseSuggestion}
                    disabled={!suggestedTitle}
                >
                    Use Suggestion
                </button>

            </div>

        </section>
    );
}

export default SessionDetails;
