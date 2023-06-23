import AuthLayout from "../../Layout/AuthLayout";

import LoginModal from "../../components/Modals/LoginModal";

const Login = () => {
  return (
    <AuthLayout>
      <LoginModal width={"w-full"} isModal={false} />
    </AuthLayout>
  );
};

export default Login;
