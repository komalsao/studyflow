import "./LumiExplanation.css";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lightbulb from "../../../../assets/lumi/lightbulb.svg";
import StudyLumi from "../../../../assets/lumi/teach.png";
import { useNavigate } from "react-router-dom";
import { askLumi } from "../../../../services/askLumi";

function LumiExplanation({

    session,

    selectedNode,

    onClose

}) {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {

        if (!selectedNode) return;

        setTypedText("");

        const text = selectedNode.explanation;

        let index = 0;

        const interval = setInterval(() => {

            setTypedText(text.slice(0, index + 1));

            index++;

            if (index >= text.length) {

                clearInterval(interval);

            }

        }, 25);

        return () => clearInterval(interval);

    }, [selectedNode]);

    useEffect(() => {

        function handleClick(event) {

            if (

                cardRef.current &&

                !cardRef.current.contains(event.target)

            ) {

                onClose();

            }

        }

        document.addEventListener(

            "mousedown",

            handleClick

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleClick

            );

    }, [onClose]);

    if (!selectedNode) return null;


    return (

        <div className="lumi-explanation">

            <div
                className="lumi-card"
                ref={cardRef}
            >
                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    <X size={16} />
                </button>

                <div className="lumi-title">
                    <img
                        src={Lightbulb}
                        alt="Lumi"
                        className="lumi-icon"
                    />

                    <h3>{selectedNode.title}</h3>
                </div>

                <p className="lumi-description">

                    {typedText}

                    {typedText.length < selectedNode.explanation.length && (

                        <span className="typing-cursor">|</span>

                    )}

                </p>

                <button
                    className="explain-more"
                    onClick={() => {
                        console.log("Explain More clicked");

                        askLumi({
                            navigate,
                            sessionId: session.id,
                            prompt: `Explain "${selectedNode.title}" in detail using my uploaded study material.`
                        });
                    }}
                >
                    Explain more →
                </button>

                <div className="lumi-tail"></div>
            </div>

            <div className="lumi-character">
                <img
                    src={StudyLumi}
                    alt="Lumi"
                />
            </div>

        </div>
    );
}

export default LumiExplanation;