import Loader from "../assets/loader.svg";

const Button = ({ text, isLoading, isModal }) => {
  return (
    <button
      className={`text-white bg-[#36416A] rounded-full w-10/12 flex justify-center mx-auto text-center p-2 py-1 cursor-pointer md:w-3/12 
      ${isModal ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"} lg:mt-10`}
      disabled={isLoading ? true : false}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <img src={Loader} alt="" width={25} height={25} />
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;
