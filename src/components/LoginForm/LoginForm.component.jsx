import styled from "styled-components";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firestore/firestore";
import GoogleLogo from "../../assets/GoogleLogo.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { FormInput } from "../FormInput/FormInput.component";
import { Button } from "../Button/Button.component";
import { DefaultButton } from "../Button/Button.component";

const Container = styled.div`
  margin: 30px auto;
  padding: 0;
  width: 300px;
  border: 1px black solid;
  background-color: #f1f1f1;
`;

const InnerLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const Form = styled.form`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const OrContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: black;

  p {
    margin: 0px;
  }
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  img {
    width: 15px;
    height: auto;
    padding-right: 10px;
  }
`;

const PasswordReset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0;
  height: 15px;

  p:hover {
    cursor: pointer;
    color: orange;
  }
`;

const defaultFormFields = {
  email: "",
  password: "",
};

// refactor: into multiple components
const LoginForm = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate("/calculator");
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      navigate("/calculator");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Container>
      <InnerLoginContainer>
        <Form action="">
          <FormInput
            label="Email"
            required
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
            autoComplete="username"
          />
          <FormInput
            label="Password"
            required
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button onClick={handleSubmit}>Login</Button>
        </Form>
        <OrContainer>
          <p>or</p>
        </OrContainer>
        <GoogleContainer>
          <GoogleButton onClick={signInWithGoogle}>
            <img src={GoogleLogo} />
            Continue with Google
          </GoogleButton>
        </GoogleContainer>
        <PasswordReset>
          <p onClick={handleForgotPassword}>Forgot password?</p>
        </PasswordReset>
      </InnerLoginContainer>
    </Container>
  );
};

export default LoginForm;
