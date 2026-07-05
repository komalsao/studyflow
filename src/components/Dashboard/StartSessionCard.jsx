import "./StartSessionCard.css";
import { FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StartSessionCard() {

    const navigate = useNavigate();

    return (

        <div
            className="start-card"
            onClick={() => navigate("/create-session")}
        >

            <div className="start-icon">

                <FileText size={32} />

            </div>

            <h2>Start New Study Session</h2>

            <p>
                Upload new materials or choose from your existing library to begin learning.
            </p>

           
        </div>

    );
}

export default StartSessionCard;