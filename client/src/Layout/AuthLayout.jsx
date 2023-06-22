import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
        <div className="h-screen bg-[#36416A] pt-16">
          <div className="w-10/12 mx-auto">
            <div className="text-white mb-10">
              <h1 className="text-4xl mb-6">Feedback</h1>
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
