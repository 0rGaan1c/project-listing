import AuthLayout from "../../layouts/AuthLayout";

import LoginModal from "../../components/Modals/LoginModal";

const Login = () => {
  return (
    <AuthLayout>
      <LoginModal width={"100%"} isModal={false} />
    </AuthLayout>
  );
};

export default Login;
