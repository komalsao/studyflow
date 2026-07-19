import "./Welcome.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import auth from "../../firebase/auth";
import welcomeLumi from "../../assets/lumi/peek.png";

function Welcome() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleDemoLogin() {

        if (loading) return;

        setLoading(true);

        try {

            await signInWithEmailAndPassword(
                auth,
                "demo.studyflow@gmail.com",
                "123456789@"
            );

            navigate("/dashboard");

        } catch (error) {

            console.error("Unable to sign into demo account:", error);

            alert("Unable to load the demo. Please try again.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <section className="welcome">

            <div className="welcome-card">

                <img
                    src={welcomeLumi}
                    alt="Lumi"
                    className="welcome-lumi"
                />

                <h1>Ready to study smarter?</h1>

                <p className="welcome-text">
                    Choose how you’d like to begin.
                </p>

                <button
                    className="primary-btn"
                    onClick={handleDemoLogin}
                    disabled={loading}
                >

                    {loading
                        ? "Opening Demo..."
                        : "Try Demo"}

                </button>

                <p className="or-text">OR</p>

                <Link to="/login">

                    <button className="secondary-btn">

                        Sign In

                    </button>

                </Link>

                <p className="signup-text">

                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="signup-link"
                    >

                        Create Account

                    </Link>

                </p>

            </div>

        </section>

    );

}

export default Welcome;