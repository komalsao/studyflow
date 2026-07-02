import "./Welcome.css";
import { Link } from "react-router-dom";
import welcomeLumi from "../../assets/lumi/peek.png";

function Welcome() {
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

                <Link to="/dashboard">
                    <button className="primary-btn">
                        Continue as Guest
                    </button>
                </Link>

                <p className="or-text">OR</p>

                <Link to="/login">
                    <button className="secondary-btn">
                        Sign In
                    </button>
                </Link>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <Link to="/login" className="signup-link">
                        Create Account
                    </Link>
                </p>

            </div>

        </section>
    );
}

export default Welcome;