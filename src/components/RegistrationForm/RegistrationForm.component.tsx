// @ts-nocheck

import styled from "styled-components";
import validator from "validator";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firestore/firestore";
import { useState } from "react";
import { Button } from "../Button/Button.component";
import { FormInput } from "../FormInput/FormInput.component";

const Container = styled.div`
  margin: 30px auto;
  padding: 0;
  width: 300px;
  border: 1px black solid;
  background-color: #f1f1f1;
`;

const InnerContainer = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  margin: 0;
  p {
    text-align: center;
    margin: 0;
  }
`;

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState(null);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      setError("Invalid e-mail address!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      window.location.reload();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setError("E-mail already in use!");
      } else {
        console.log("User creation encountered an error!", error);
      }
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Header>
          <h3>Register account</h3>
        </Header>
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
          {error && (
            <Error>
              <p>{error}</p>
            </Error>
          )}
          <Button>Register</Button>
        </Form>
      </InnerContainer>
    </Container>
  );
};

export default RegistrationForm;
