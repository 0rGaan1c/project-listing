import AuthLayout from "../../Layout/AuthLayout";
import SignupModal from "../../components/Modals/SignupModal";

const Signup = () => {
  return (
    <AuthLayout>
      <SignupModal width={"w-full"} isModal={false} />
    </AuthLayout>
  );
};

export default Signup;
