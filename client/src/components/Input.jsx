const Input = ({ label, type, value, setInputVal, placeholder }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      {label && (
        <label>
          <img src={label} alt={placeholder} />
        </label>
      )}
      <input
        className="outline-none border-b-2 w-10/12 pl-2 py-px placeholder-[#737373] md:w-11/12"
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
