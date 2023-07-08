import Loader from "../assets/loader.svg";
import "../styles/components/Button.css";

const Button = ({ text, isLoading, isModal }) => {
  return (
    <button
      className={`submit-btn
      ${isModal ? "btn-is-modal" : "btn-no-modal"}`}
      disabled={isLoading ? true : false}
    >
      {isLoading ? (
        <div className="loading">
          <img src={Loader} alt="" width={25} height={25} />
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;
