import { useLocation } from "react-router-dom";
import "../styles/layouts/ModalLayout.css";

const ModalLayout = ({ children, width, isModal }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div
        className={`modal-layout 
        ${currentPath === "/" ? "border-none" : ""}
        ${isModal ? "is-modal-container" : ""}`}
        style={{ width: width }}
      >
        <div className={`${isModal ? "is-modal" : "not-modal"}`}>
          {children}
        </div>

        {isModal && (
          <div className="is-modal-right">
            <p className="feedback">Feedback</p>
            <p className="add-text">
              Add your
              <br /> product and <br />
              rate other <br />
              items.............
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalLayout;
