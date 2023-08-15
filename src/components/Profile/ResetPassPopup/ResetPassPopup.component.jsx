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

export const ResetPassPopup = ({ setPopup }) => {
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
    console.log("fuck ye");
  };

  const handleCancel = () => {
    setPopup(null);
  };

  return (
    <Popup title="Set New Password">
      <FormInput
        required
        type="text"
        value={newPass}
        onChange={handleChange}
        label="Password"
        name="newPass"
      />
      <FormInput
        required
        type="text"
        value={newConfirm}
        onChange={handleChange}
        label="Confirm Password"
        name="newConfirm"
      />
      <ButtonsContainer>
        <Button buttonType={"green"} onClick={handleSubmit}>
          Submit
        </Button>
        <Button buttonType={"red"} onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonsContainer>
    </Popup>
  );
};
