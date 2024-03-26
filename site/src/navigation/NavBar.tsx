import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ppBlue } from "../utils/colors";
import { NavButton } from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

const Container = styled.div`
  display: flex;
  padding: 2px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: ${ppBlue};
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
  justify-content: space-between;
  width: 65%;
`;

const LeftSide = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

const RightSide = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

export function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <NavButton destination="guide">Guide</NavButton>
          <NavButton destination="calculator">Calculator</NavButton>
          <NavButton destination="about">About</NavButton>
        </LeftSide>
        <RightSide>
          {isAuthenticated ? (
            <>
              <NavButton destination="profile">Profile</NavButton>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </RightSide>
      </Wrapper>
    </Container>
  );
}
