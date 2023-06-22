import Input from "../../components/Input";
import UserIcon from "../../assets/user.svg";
import EmailIcon from "../../assets/mail.svg";
import MobileIcon from "../../assets/mobile.svg";
import PasswordIcon from "../../assets/password.svg";
import { useState } from "react";
import { signup } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import ModalLayout from "../../Layout/ModalLayout";

const SignupModal = ({
  width,
  isModal,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = { name, email, mobile, password };
    const result = await signup(formData);

    console.log(result);
    if (result.status === "ok") {
      toast.success("Signup Successfull.");
      if (isModal) {
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        navigate("/login");
      }, 200);
      setIsLoading(false);
    } else {
      toast.error(result.error || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout isOpen={true} onClose={null} width={width}>
      <form onSubmit={handleSignup}>
        <Input
          label={UserIcon}
          type="text"
          value={name}
          setInputVal={setName}
          placeholder={"Name"}
        />
        <Input
          label={EmailIcon}
          type="email"
          value={email}
          setInputVal={setEmail}
          placeholder={"Email"}
        />
        <Input
          label={MobileIcon}
          type="number"
          value={mobile}
          setInputVal={setMobile}
          placeholder={"Mobile"}
        />
        <Input
          label={PasswordIcon}
          type="password"
          value={password}
          setInputVal={setPassword}
          placeholder={"Password"}
        />
        <div className="mb-6">
          <p className="text-[#737373] font-medium">Already have an account?</p>
          {isModal ? (
            <p
              className="text-[#36416A] underline cursor-pointer"
              onClick={() => {
                setIsSignupModalOpen(false);
                setIsLoginModalOpen(true);
              }}
            >
              Log in
            </p>
          ) : (
            <Link to="/login" className="text-[#36416A] underline">
              Log in
            </Link>
          )}
        </div>
        <Button text={"Sign Up"} isLoading={isLoading} />
      </form>
    </ModalLayout>
  );
};

export default SignupModal;
