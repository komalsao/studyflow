import "./Onboarding.css";
import sitLumi from "../../assets/lumi/sit.png";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import db from "../../firebase/firestore";
import auth from "../../firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Onboarding() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleContinue = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }
        try {
            const user = auth.currentUser;
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
            });

            navigate("/dashboard");

        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="onboarding-page">
            <div className="onboarding-card">

                <h2 className="brand-title">StudyFlow</h2>

                <h1>Nice to meet you!
                    <FaHeart className="heart-icon" />
                </h1>

                <p className="subtitle">
                    I'm <span>Lumi</span>,
                    <br />
                    your study companion.
                </p>

                <form onSubmit={handleContinue}>
                    <div className="input-wrapper">

                        <img
                            src={sitLumi}
                            alt="Lumi"
                            className="sit-lumi"
                        />

                        <label className="floating-label">
                            What should I call you?
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    <p className="journey-text">
                        🌱 Let's start our study journey together
                    </p>

                    <button className="continue-btn">
                        Continue →
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Onboarding;