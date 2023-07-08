import "../styles/components/Input.css";

const Input = ({ label, type, value, setInputVal, placeholder }) => {
  return (
    <div className="input-container">
      {label && (
        <label>
          <img src={label} alt={placeholder} />
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
