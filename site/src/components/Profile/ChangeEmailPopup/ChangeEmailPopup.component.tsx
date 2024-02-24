import styled from "styled-components";
import { Popup } from "../../Popup/Popup.component";
import { FormInput } from "../../FormInput/FormInput.component";
import { Button } from "../../Button/Button.component";
import { useState } from "react";
import {
  setNewEmail,
  signInAuthUserWithEmailAndPassword,
} from "../../../utils/firestore/firestore";
import validator from "validator";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 48%;
  }
`;

const ErrorMessage = styled.p`
  margin: 0 auto;
  color: red;
  text-align: center;
`;

const Form = styled.form`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

interface Props {
  setEmailPopup: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

export const ChangeEmailPopup = ({ setEmailPopup, email }: Props) => {
  const [formFields, setFormFields] = useState({
    newEmail: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { newEmail, password } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validator.isEmail(newEmail)) {
      setError("Invalid e-mail address!");
      return;
    }

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      await setNewEmail(newEmail);
      setError(null);
      setEmailPopup(false);
    } catch (error: any) {
      console.log(error.code);

      setError("An error occured!");
    }
  };

  const handleCancel = () => {
    setError(null);
    setEmailPopup(false);
  };

  return (
    <Popup title="Update e-mail address">
      <Form>
        <FormInput
          required
          type="text"
          value={newEmail}
          onChange={handleChange}
          label="New e-mail address"
          name="newEmail"
        />
        <FormInput
          required
          type="password"
          value={password}
          onChange={handleChange}
          label="Confirm Password"
          name="password"
          autoComplete="current-password"
        />
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonsContainer>
        <Button buttonType={"green"} onClick={handleSubmit}>
          Enter
        </Button>
        <Button buttonType={"red"} onClick={handleCancel}>
          Back
        </Button>
      </ButtonsContainer>
    </Popup>
  );
};
