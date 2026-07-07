import "./HeroCard.css";
import lumi from "../../../assets/lumi/wave.png";

const heroData = [
  {
    title: "Focus on learning.",
    subtitle: "I'll take care of the rest.",
    description:
      "Everything you need for this study session is ready.\nChoose where you'd like to begin.",
    image: lumi,
  },

  {
    title: "Discipline today.",
    subtitle: "Freedom tomorrow.",
    description:
      "You completed 4 flashcards yesterday.\nLet's build on that momentum.",
    image: lumi,
  },

  {
    title: "Small steps.",
    subtitle: "Big results.",
    description:
      "You've studied 3 days in a row.\nLet's keep the streak alive.",
    image: lumi,
  },
];

function HeroCard() {

  // Later this object will come from your backend / AI.
  const hero = heroData[0];

  return (

    <section className="workspace-hero-card">

      <div className="workspace-hero-content">

  

        <h1 className="workspace-hero-title">
          {hero.title}
        </h1>

        <h2 className="workspace-hero-subtitle">
          {hero.subtitle}
        </h2>

        <p className="workspace-hero-description">
          {hero.description
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>

      </div>

      <div className="workspace-hero-image">

        <img
          src={hero.image}
          alt="Lumi"
        />

      </div>

    </section>

  );

}

export default HeroCard;