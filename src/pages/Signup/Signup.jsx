import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sideLumi from "../../assets/lumi/side.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import auth from "../../firebase/auth";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import db from "../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSignup = async (e) => {

        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);

        try {

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Account created successfully!");

            navigate("/onboarding");

        } catch (error) {

            alert(error.message);

        } finally {

            setIsLoading(false);

        }

    };

    const handleGoogleSignup = async () => {

        if (isLoading) return;

        setIsLoading(true);

        try {

            const result = await signInWithPopup(auth, provider);

            const docRef = doc(db, "users", result.user.uid);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                navigate("/dashboard");

            } else {

                navigate("/onboarding");

            }

        } catch (error) {

            alert(error.message);

        } finally {

            setIsLoading(false);

        }

    };

    return (

        <div className="login-page">

            <img
                src={sideLumi}
                alt="Lumi"
                className="login-lumi"
            />

            <div className="login-card">

                <form onSubmit={handleSignup}>

                    <div className="brand">

                        <h2 className="brand-title">
                            StudyFlow
                        </h2>

                        <p className="brand-tagline">
                            Learn smarter together.
                        </p>

                    </div>

                    <h1>Create your account</h1>

                    <p className="login-subtitle">
                        Start your StudyFlow journey today.
                    </p>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleSignup}
                        disabled={isLoading}
                    >

                        <FcGoogle className="google-icon" />

                        {isLoading
                            ? "Signing In..."
                            : "Continue with Google"}

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <div className="password-input">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >

                                {showPassword
                                    ? <FiEyeOff />
                                    : <FiEye />}

                            </button>

                        </div>

                    </div>

                    <Link
                        to="/"
                        className="forgot-password"
                    >
                        Forgot password?
                    </Link>

                    <button
                        type="submit"
                        className="signin-btn"
                        disabled={isLoading}
                    >

                        {isLoading
                            ? "Creating Account..."
                            : "Create Account"}

                    </button>

                    <p className="signup-text">

                        Already have an account?

                        <Link
                            to="/login"
                            className="signup-link"
                        >

                            {" "}Sign In

                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Signup;