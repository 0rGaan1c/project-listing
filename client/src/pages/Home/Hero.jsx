import HeroImg from "../../assets/herodesktop.png";

const Hero = () => {
  return (
    <div className="lg:flex lg:items-center lg:justify-evenly lg:mt-10">
      <div className="">
        <img
          src={HeroImg}
          alt="hero img"
          className="mx-auto w-[300px] h-[330px] lg:w-[400px] lg:h-[430px]"
        />
      </div>
      <div className="lg:w-[50%]">
        <h1 className="font-medium text-xl lg:text-5xl lg:leading-[60px]">
          Add your products and give your valuable feedback
        </h1>
        <p className="text-[#6A6A6A] text-sm mt-4 md:text-base lg:w-[70%] lg:font-medium">
          Easily give your feedback in a matter of minutes. Access your audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
};

export default Hero;
