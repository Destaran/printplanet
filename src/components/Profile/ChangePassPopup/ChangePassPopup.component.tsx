import styled from "styled-components";
import { Popup } from "../../Popup/Popup.component";
import { FormInput } from "../../FormInput/FormInput.component";
import { Button } from "../../Button/Button.component";
import { useState } from "react";
import {
  setNewPassword,
  signInAuthUserWithEmailAndPassword,
} from "../../../utils/firestore/firestore";

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
  email: string;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePassPopup = ({ email, setPopup }: Props) => {
  const [formFields, setFormFields] = useState({
    oldPass: "",
    newPass: "",
    newConfirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { oldPass, newPass, newConfirm } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPass !== newConfirm) {
      setError("Passwords do not match!");
      return;
    }
    if (newPass.length < 6) {
      setError("Password should be at least 6 characters long!");
      return;
    }
    try {
      await signInAuthUserWithEmailAndPassword(email, oldPass);
      await setNewPassword(newPass);
      setError(null);
      setPopup(false);
    } catch (error: any) {
      if (error.code == "auth/wrong-password") {
        setError("Wrong password!");
        return;
      }
      setError("An error occured!");
    }
  };

  const handleCancel = () => {
    setError(null);
    setPopup(false);
  };

  return (
    <Popup title="Set New Password">
      <Form>
        <FormInput
          required
          type="password"
          value={oldPass}
          onChange={handleChange}
          label="Old Password"
          name="oldPass"
        />
        <FormInput
          required
          type="password"
          value={newPass}
          onChange={handleChange}
          label="New Password"
          name="newPass"
        />
        <FormInput
          required
          type="password"
          value={newConfirm}
          onChange={handleChange}
          label="Confirm Password"
          name="newConfirm"
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
