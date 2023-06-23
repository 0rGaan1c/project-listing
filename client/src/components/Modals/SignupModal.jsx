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
    <ModalLayout width={width} isModal={isModal}>
      {isModal && (
        <div className="hidden lg:block text-3xl font-bold mb-8">
          Signup to continue
        </div>
      )}
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
        <div className="mb-6 md:flex md:gap-2">
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
        <Button text={"Sign Up"} isLoading={isLoading} isModal={isModal} />
      </form>
    </ModalLayout>
  );
};

export default SignupModal;
