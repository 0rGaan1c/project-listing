import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.access_token) {
      setIsLoggedIn(true);
    }
  }, [cookie.access_token]);

  return (
    <nav className="bg-[#36416A] text-white">
      <div className="w-11/12 mx-auto flex justify-between py-3 items-center">
        <p className="text-xl font-medium">Feedback</p>
        <div className="flex gap-3 text-sm items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setCookie("access_token", "", { path: "/" });
                  navigate("/login");
                }}
              >
                Log out
              </button>
              <img src={Avatar} alt="avatar" />
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>

              <Link
                to="/signup"
                className="rounded-md border-white border px-3 py-1"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
