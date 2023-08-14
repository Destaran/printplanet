import styled from "styled-components";
import validator from "validator";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firestore/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button.component";
import { FormInput } from "../FormInput/FormInput.component";

const RegistrationContainer = styled.div`
  margin: 30px auto;
  padding: 0;
  width: 300px;
  border: 1px black solid;
  background-color: #f1f1f1;
`;

const InnerRegistrationContainer = styled.div`
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

const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      alert("Invalid e-mail address!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      navigate("/calculator");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Email already in use!");
      } else {
        console.log("User creation encountered an error!", error);
      }
    }
  };

  return (
    <RegistrationContainer>
      <InnerRegistrationContainer>
        <ContainerHeader>
          <h3>Register account</h3>
        </ContainerHeader>
        <Form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            required
            type="text"
            value={displayName}
            name="displayName"
            onChange={handleChange}
          />
          <FormInput
            label="E-mail"
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
          <FormInput
            label="Confirm Password"
            required
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          <Button>Register</Button>
        </Form>
      </InnerRegistrationContainer>
    </RegistrationContainer>
  );
};

export default RegistrationForm;
