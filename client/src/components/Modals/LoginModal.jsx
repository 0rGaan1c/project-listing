import React, { useState } from "react";
import EmailIcon from "../../assets/mail.svg";
import PasswordIcon from "../../assets/password.svg";
import ModalLayout from "../../Layout/ModalLayout";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Button from "../Button";

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
    <ModalLayout isOpen={true} width={width}>
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
        <div className="mb-6">
          <p className="text-[#737373] font-medium">Don’t have an account?</p>
          {isModal ? (
            <p
              className="text-[#36416A] underline cursor-pointer"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsSignupModalOpen(true);
              }}
            >
              Sign up
            </p>
          ) : (
            <Link to="/signup" className="text-[#36416A] underline">
              Sign up
            </Link>
          )}
        </div>
        <Button text={"Log in"} isLoading={isLoading} />
      </form>
    </ModalLayout>
  );
};

export default LoginModal;