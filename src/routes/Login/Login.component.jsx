import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm.component";

const Container = styled.div`
  background-color: #f1f1f1;
  font-size: 16px;
  margin: 40px auto;
  padding: 0;
  width: 300px;
  display: flex;
  justify-content: center;
  border: 1px black solid;
  border-radius: 10px;

  span {
    color: black;
    font-weight: 600;

    &:hover {
      cursor: pointer;
      color: orange;
    }
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/registration");
  };

  return (
    <>
      <LoginForm />
      <Container>
        <p>
          Don&apos;t have an account?{" "}
          <span onClick={navigateHandler}>Register here!</span>
        </p>
      </Container>
    </>
  );
};
