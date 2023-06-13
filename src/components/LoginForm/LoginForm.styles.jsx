import styled from "styled-components";

import { DefaultButton } from "../Button/Button.component";

export const LoginContainer = styled.div`
  margin: 30px auto;
  padding: 0;
  width: 300px;
  border: 1px black solid;
  background-color: #f1f1f1;
  border-radius: 10px;
`;

export const InnerLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

export const Form = styled.form`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export const OrContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: black;

  p {
    margin: 0px;
  }
`;

export const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GoogleButton = styled(DefaultButton)`
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

export const PasswordReset = styled.div`
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
