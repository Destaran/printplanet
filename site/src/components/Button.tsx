import styled from "styled-components";
import { ButtonHTMLAttributes, ReactNode } from "react";

export const DefaultButton = styled.button`
  border: 1px solid black;
  font-size: 16px;
  padding: 5px;
  width: 100%;
  margin: 15px 0;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.blue};
    border-color: ${({ theme }) => theme.colors.blue};
    transition: all 0.3s;
  }

  &:active {
    transition: all 0.1s;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.blue};
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

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
}

export const Button = ({ children, buttonType, ...otherProps }: Props) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};
