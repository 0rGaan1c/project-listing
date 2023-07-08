import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";
import { useCookies } from "react-cookie";
import "../../styles/pages/Home/Navbar.css";

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
    <nav className="nav">
      <div className="nav-container">
        <p className="nav-logo">Feedback</p>
        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setCookie("access_token", "", { path: "/" });
                  navigate("/login");
                }}
                className="nav-logout-btn"
              >
                Log out
              </button>
              <span className="nav-hello">Hello!</span>
              <img src={Avatar} alt="avatar" />
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>

              <Link to="/signup" className="nav-signup">
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
