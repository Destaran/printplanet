import styled from "styled-components";

export const DefaultButton = styled.button`
  border: 1px solid black;
  font-size: 16px;
  border-radius: 4px;
  padding: 5px;
  width: 100%;
  margin: 15px 0;
  background-color: #14213d;
  color: #f4f1de;

  &:hover {
    cursor: pointer;
    background-color: orange;
    color: #14213d;
    border-color: #14213d;
  }

  &:active {
    background-color: #14213d;
    color: #f4f1de;
  }
`;

const RedButton = styled(DefaultButton)`
  background-color: #580000;
  color: white;

  &:hover {
    background-color: red;
    color: black;
  }

  &:active {
    background-color: #580000;
    color: white;
  }
`;

const GreenButton = styled(DefaultButton)`
  background-color: #003f00;
  color: white;

  &:hover {
    background-color: #00c300;
    color: black;
  }

  &:active {
    background-color: #003f00;
    color: white;
  }
`;

const BUTTON_TYPE_CLASSES = {
  default: "default",
  red: "red",
  green: "green",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.default) =>
  ({
    [BUTTON_TYPE_CLASSES.default]: DefaultButton,
    [BUTTON_TYPE_CLASSES.red]: RedButton,
    [BUTTON_TYPE_CLASSES.green]: GreenButton,
  }[buttonType]);

export const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};
