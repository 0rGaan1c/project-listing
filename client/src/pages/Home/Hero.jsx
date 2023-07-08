import HeroImg from "../../assets/herodesktop.png";
import "../../styles/pages/Home/Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div>
        <img src={HeroImg} alt="hero img" className="hero-img" />
      </div>
      <div className="hero-content">
        <h1>Add your products and give your valuable feedback</h1>
        <p>
          Easily give your feedback in a matter of minutes. Access your audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
};

export default Hero;
