import heroLumi from "../assets/lumi/hero.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-intro">
          Meet Lumi, your study companion.
        </p>

        <h1>
          Study smarter.
          <br />
          Feel calmer.
        </h1>

        <p className="hero-description">
          Let's turn your notes into something you'll actually enjoy studying.
        </p>
       
       <Link to="/welcome">
        <button className="hero-button">
            Open My Study Space
        </button>
       </Link>


      </div>

      <div className="hero-image">
        <img src={heroLumi} alt="Lumi reading a book" />
      </div>

    </section>
  );
}

export default Hero;