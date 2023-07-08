import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../../components/Modals/LoginModal";
import SignupModal from "../../components/Modals/SignupModal";
import ProductModal from "../../components/Modals/ProductModal";
import "../../styles/pages/Home/MenuBox.css";

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
      if (!event.target.closest(".modal-layout")) {
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
            width={"91.666667%"}
            isModal={true}
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
          />
        </div>
      )}
      {isLoginModalOpen && (
        <div className="blackScreen-overlay">
          <LoginModal
            width={"91.666667%"}
            isModal={true}
            setIsSignupModalOpen={setIsSignupModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        </div>
      )}
      <div className="menu-box">
        <p className="suggestion">{totalProducts} Suggestions</p>
        <div className="sort">
          <p>Sort by: </p>
          <select
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            value={sortBy}
          >
            <option value="">Select</option>
            <option value="upvote" className="option">
              Upvote
            </option>
            <option value="comment" className="option">
              Comment
            </option>
          </select>
        </div>
        <button className="add-prod-btn" onClick={handleClick}>
          + Add product
        </button>
      </div>
    </>
  );
};

export default MenuBox;
