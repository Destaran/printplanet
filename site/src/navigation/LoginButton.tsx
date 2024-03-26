import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Button = styled.p`
  margin: 0;
  text-decoration: none;
  padding: 0px;
  cursor: pointer;
  transition: all 1s;
  color: white;

  &:hover {
    color: orange;
    transition: all 0.3s;
  }

  &:active {
    transform: scale(0.95);
    color: white;
    transition: all 0.03s;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: auto;
  margin: 2px 15px 2px 15px;
`;

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </Wrapper>
  );
}
