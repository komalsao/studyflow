import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sideLumi from "../../assets/lumi/side.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import auth from "../../firebase/auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import db from "../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }

      alert("Login successful!");

    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
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
        <form onSubmit={handleLogin}>

          <div className="brand">
            <h2 className="brand-title">StudyFlow</h2>
            <p className="brand-tagline">
              Learn smarter together.
            </p>
          </div>

          <h1>Welcome back!</h1>

          <p className="login-subtitle">
            Sign in to continue your study journey.
          </p>

          <button className="google-btn" onClick={handleGoogleLogin}>
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
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

          </div>

          <button type="button" className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="signin-btn"
          >
            Sign In
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup" className="signup-link">
              {" "}Create one
            </Link>
          </p>
        </form>
      </div>

    </div >
  );
}

export default Login;