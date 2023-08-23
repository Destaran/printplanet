import styled from "styled-components";
import { Popup } from "../../Popup/Popup.component";
import { FormInput } from "../../FormInput/FormInput.component";
import { Button } from "../../Button/Button.component";
import { useState } from "react";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 48%;
  }
`;

export const ChangePassPopup = ({ setPopup }) => {
  const [formFields, setFormFields] = useState({
    newPass: "",
    newConfirm: "",
  });
  const { newPass, newConfirm } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = () => {
    //
  };

  const handleCancel = () => {
    setPopup(null);
  };

  return (
    <Popup title="Set New Password">
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
      <ButtonsContainer>
        <Button buttonType={"green"} onClick={handleSubmit}>
          <u>E</u>nter
        </Button>
        <Button buttonType={"red"} onClick={handleCancel}>
          <u>B</u>ack
        </Button>
      </ButtonsContainer>
    </Popup>
  );
};
