import "./HeroCard.css";
import sit from "../../assets/lumi/study.png";
import { Play, Sparkles } from "lucide-react";

function HeroCard({ name }) {
  const hour = new Date().getHours();

  let greeting = "";
  let subtitle = "";

  if (hour >= 5 && hour < 12) {
    greeting = "☀️ Good Morning";
    subtitle = "Ready to kickstart your learning today?";
  } else if (hour >= 12 && hour < 17) {
    greeting = "🌤 Good Afternoon";
    subtitle = "Ready to conquer today's notes?";
  } else if (hour >= 17 && hour < 21) {
    greeting = "🌇 Good Evening";
    subtitle = "Let's finish today's study goals.";
  } else {
    greeting = "🌙 Good Night";
    subtitle = "Burning the midnight oil? Let's make it count.";
  }
  return (
    <section className="hero-card">

      <div className="hero-left">

        <div className="greeting-pill">
          <span>{greeting}</span>
        </div>

        <h1>
          Welcome back,
          <br />
          <span>{name}!</span>
        </h1>

        <p>{subtitle}</p>

        <button className="hero-btn">
          <Play size={18} fill="white" />
          Continue Studying
        </button>

      </div>

      <div className="hero-right">

        <img
          src={sit}
          alt="Lumi"
          className="hero-lumi"
        />

      </div>

    </section>
  );
}

export default HeroCard;