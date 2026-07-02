import "./Signup.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sideLumi from "../../assets/lumi/side.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="login-page">
            <img
                src={sideLumi}
                alt="Lumi"
                className="login-lumi"
            />

            <div className="login-card">

                <div className="brand">
                    <h2 className="brand-title">StudyFlow</h2>
                    <p className="brand-tagline">
                        Learn smarter together.
                    </p>
                </div>

                <h1>Create your account</h1>

                <p className="login-subtitle">
                    Start your StudyFlow journey today.
                </p>

                <button className="google-btn">
                    <FcGoogle className="google-icon" />
                    Continue with Google
                </button>

                <div className="divider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>

                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                </div>

                <Link to="/" className="forgot-password">
                    Forgot password?
                </Link>

                <button className="signin-btn">
                    Create Account
                </button>

                <p className="signup-text">
                    Already have an account?
                    <Link to="/login" className="signup-link">
                        {" "}Sign In
                    </Link>
                </p>

            </div>

        </div >
    );
}

export default Login;