import React, { useState } from "react";
import EmailIcon from "../../assets/mail.svg";
import PasswordIcon from "../../assets/password.svg";
import ModalLayout from "../../layouts/ModalLayout";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Button from "../Button";
import "../../styles/components/Modals/LoginModal.css";

const LoginModal = ({
  width,
  isModal,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = { email, password };
    const result = await login(formData);

    console.log(result);
    if (result.status === "ok") {
      setCookie("access_token", result.data.token, { path: "/" });
      navigate("/");
      if (isModal) {
        setIsLoginModalOpen(false);
      }
      setIsLoading(false);
    } else {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout width={width} isModal={isModal}>
      {isModal && <div className="login-continue">Log in to continue</div>}
      <form onSubmit={handleLogin}>
        <Input
          label={EmailIcon}
          type="email"
          value={email}
          setInputVal={setEmail}
          placeholder={"Email"}
        />
        <Input
          label={PasswordIcon}
          type="password"
          value={password}
          setInputVal={setPassword}
          placeholder={"Password"}
        />
        <div className="login-no-account-container">
          <p className="no-account-text">Don’t have an account?</p>
          {isModal ? (
            <p
              className="signup-text"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsSignupModalOpen(true);
              }}
            >
              Sign up
            </p>
          ) : (
            <Link to="/signup" className="signup-text">
              Sign up
            </Link>
          )}
        </div>
        <Button text={"Log in"} isLoading={isLoading} isModal={isModal} />
      </form>
    </ModalLayout>
  );
};

export default LoginModal;
