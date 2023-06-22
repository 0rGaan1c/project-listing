const MobileModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="w-full bg-white rounded-lg px-6 py-10 shadow-custom">
          {children}
        </div>
      )}
    </>
  );
};

export default MobileModal;
