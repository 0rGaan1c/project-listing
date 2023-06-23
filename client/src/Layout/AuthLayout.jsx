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
        <div className="h-screen bg-[#36416A] pt-20 md:pt-24">
          <div className="w-10/12 mx-auto md:w-7/12 lg:w-2/4 xl:w-5/12">
            <div className="text-white mb-10 lg:mb-6">
              <h1 className="text-4xl mb-6 lg:text-5xl lg:font-medium">
                Feedback
              </h1>
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
