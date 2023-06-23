import { useLocation } from "react-router-dom";

const ModalLayout = ({ children, width, isModal }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div
        className={`${width} bg-white rounded-lg px-6 pt-12 pb-8 shadow-custom md:px-10 md:pt-16 md:pb-12 md:rounded-2xl
        ${currentPath === "/" ? "lg:rounded-none" : ""}
        lg:grid lg:grid-cols-5 ${isModal ? "lg:w-7/12 lg:p-0 lg:h-[75vh]" : ""}
        `}
      >
        <div
          className={`${
            isModal ? "lg:col-span-3 lg:px-16 lg:py-16" : "lg:col-span-5"
          }`}
        >
          {children}
        </div>

        {isModal && (
          <div className="hidden lg:block lg:bg-[#36416A] text-white pt-16 px-8 lg:col-span-2 lg:h-[75vh]">
            <p className="text-4xl">Feedback</p>
            <p className="text-3xl mt-4">
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
