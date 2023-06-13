import LoginForm from "../../components/LoginForm/LoginForm.component";

import { useNavigate } from "react-router-dom";

import { SignUpContainer } from "./Login.styles";

const Login = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/registration");
  };

  return (
    <>
      <LoginForm />
      <SignUpContainer>
        <p>
          Don&apos;t have an account?{" "}
          <span onClick={navigateHandler}>Register here!</span>
        </p>
      </SignUpContainer>
    </>
  );
};

export default Login;
