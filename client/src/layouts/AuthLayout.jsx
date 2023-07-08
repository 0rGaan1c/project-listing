import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/layouts/AuthLayout.css";

const AuthLayout = ({ children }) => {
  const [checkingToken, setCheckingToken] = useState(true);
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      setCheckingToken(false);
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      {!checkingToken && (
        <div className="auth-layout">
          <div className="auth-layout-container">
            <div className="auth-layout-header">
              <h1>Feedback</h1>
              <p>Add your products and give us your valuable feedback</p>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
