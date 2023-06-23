import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../../components/Modals/LoginModal";
import SignupModal from "../../components/Modals/SignupModal";
import ProductModal from "../../components/Modals/ProductModal";

const MenuBox = ({ totalProducts, setSortBy }) => {
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
      <div className="border-2 border-[#36416a59] rounded-md p-2 mt-8 flex justify-between text-sm items-center">
        <p className="font-medium">{totalProducts} Suggestions</p>
        <select
          className="text-[#8B8B8B]"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="">Sort By</option>
          <option value="upvote">Upvote</option>
          <option value="comment">Comment</option>
        </select>
        <button
          className="rounded-md bg-[#36416A] text-white py-1 px-3"
          onClick={handleClick}
        >
          + Add product
        </button>
      </div>
    </>
  );
};

export default MenuBox;
