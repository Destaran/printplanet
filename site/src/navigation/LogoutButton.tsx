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
    color: red;
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

export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Wrapper>
      <Button onClick={() => logout()}>Logout</Button>
    </Wrapper>
  );
}
