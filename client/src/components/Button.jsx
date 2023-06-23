import Loader from "../assets/loader.svg";

const Button = ({ text, isLoading }) => {
  return (
    <button
      className="text-white bg-[#36416A] rounded-full w-10/12 flex justify-center mx-auto text-center p-2 cursor-pointer"
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
