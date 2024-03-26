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
    color: "orange";
    transition: all 0.3s;
  }

  &:active {
    transform: scale(0.95);
    color: white;
    transition: all 0.03s;
  }
`;

export function LoginLogout() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Button onClick={() => logout()}>Logout</Button>;
  }

  return <Button onClick={() => loginWithRedirect()}>Login</Button>;
}
