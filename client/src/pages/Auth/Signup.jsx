import AuthLayout from "../../layouts/AuthLayout";
import SignupModal from "../../components/Modals/SignupModal";

const Signup = () => {
  return (
    <AuthLayout>
      <SignupModal width={"100%"} isModal={false} />
    </AuthLayout>
  );
};

export default Signup;
