import HeroImg from "../../assets/hero.png";

const Hero = () => {
  return (
    <div>
      <img src={HeroImg} alt="hero img" className="mx-auto" />
      <div>
        <h1 className="font-medium text-xl">
          Add your products and give your valuable feedback
        </h1>
        <p className="text-[#6A6A6A] text-sm mt-4">
          Easily give your feedback in a matter of minutes. Access your audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
};

export default Hero;
