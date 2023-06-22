const ModalLayout = ({ isOpen, children, width }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`${width} bg-white rounded-lg px-6 py-10 shadow-custom`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ModalLayout;
