import {
  LoginContainer,
  InnerLoginContainer,
  Form,
  OrContainer,
  GoogleContainer,
  GoogleButton,
  PasswordReset,
} from "./LoginForm.styles";

import GoogleLogo from "../../assets/GoogleLogo.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../FormInput/FormInput.component";
import { Button } from "../Button/Button.component";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firestore/firestore";

const defaultFormFields = {
  email: "",
  password: "",
};

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
    <LoginContainer>
      <InnerLoginContainer>
        <Form action="">
          <FormInput
            label="Email"
            required
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            required
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
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
    </LoginContainer>
  );
};

export default LoginForm;
