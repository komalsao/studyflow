import aboutLumi from "../assets/lumi-wave.png";

function About() {
  return (
    <section className="about">

      <div className="about-image">
        <img src={aboutLumi} alt="Lumi waving" />
      </div>

      <div className="about-content">

        <h2>Hi! I'm Lumi. 👋</h2>

        <p>
          I'll help you organize your notes,
          explain tricky concepts, and make
          studying feel a little lighter.
        </p>

        <p className="about-quote">
          You bring the curiosity.
          I'll help with the rest. 🌱
        </p>

      </div>

    </section>
  );
}

export default About;