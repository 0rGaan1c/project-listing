import React from "react";
import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../../components/Modals/LoginModal";
import SignupModal from "../../components/Modals/SignupModal";

const MenuBox = ({ totalProducts }) => {
  const isLoggedIn = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      console.log("open add product");
    } else {
      setIsSignupModalOpen(true);
    }
  };

  return (
    <>
      {isSignupModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-[#00000040] no-scroll">
          <SignupModal
            width={"w-11/12"}
            isModal={true}
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
          />
        </div>
      )}
      {isLoginModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-[#00000040] no-scroll">
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
        <select className="text-[#8B8B8B]">
          <option value="sortby">Sort By</option>
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
