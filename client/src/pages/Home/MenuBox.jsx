import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../../components/Modals/LoginModal";
import SignupModal from "../../components/Modals/SignupModal";
import ProductModal from "../../components/Modals/ProductModal";

const MenuBox = ({ totalProducts, setSortBy, sortBy }) => {
  const isLoggedIn = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsProductModalOpen(true);
    } else {
      setIsSignupModalOpen(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".shadow-custom")) {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);
        setIsProductModalOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);
        setIsProductModalOpen(false);
      }
    };

    if (isLoginModalOpen || isSignupModalOpen || isProductModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isLoginModalOpen, isSignupModalOpen, isProductModalOpen]);

  return (
    <>
      {isProductModalOpen && (
        <div className="blackScreen-overlay">
          <ProductModal
            setIsProductModalOpen={setIsProductModalOpen}
            type={"add"}
          />
        </div>
      )}
      {isSignupModalOpen && (
        <div className="blackScreen-overlay">
          <SignupModal
            width={"w-11/12"}
            isModal={true}
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
          />
        </div>
      )}
      {isLoginModalOpen && (
        <div className="blackScreen-overlay">
          <LoginModal
            width={"w-11/12"}
            isModal={true}
            setIsSignupModalOpen={setIsSignupModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        </div>
      )}
      <div className="border-2 border-[#36416a59] rounded-md p-2 mt-8 flex justify-between text-sm items-center lg:py-3 lg:px-4">
        <p className="font-bold lg:text-base">{totalProducts} Suggestions</p>
        <div>
          <p className="hidden lg:inline text-[#8B8B8B]">Sort by: </p>
          <select
            className="text-[#8B8B8B] lg:text-base lg:font-bold lg:text-black"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            value={sortBy}
          >
            <option value="">Select</option>
            <option value="upvote" className="lg:text-black">
              Upvote
            </option>
            <option value="comment" className="lg:text-black">
              Comment
            </option>
          </select>
        </div>
        <button
          className="rounded-md bg-[#36416A] text-white py-1 px-3 lg:py-2 lg:px-6"
          onClick={handleClick}
        >
          + Add product
        </button>
      </div>
    </>
  );
};

export default MenuBox;
