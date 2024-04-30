import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavButton } from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 2px 0 2px 0;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 80%;
`;

const SideWrapper = styled.div`
  display: flex;
`;

export function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <Wrapper>
        <SideWrapper>
          <NavButton destination="configurator" title="Config" />
          <NavButton destination="calculator" title="Calculator" />
        </SideWrapper>
        <SideWrapper>
          <NavButton destination="guide" title="Guide" />
          <NavButton destination="about" title="About" />
          {isAuthenticated ? (
            <>
              <NavButton destination="profile" title="Profile" />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </SideWrapper>
      </Wrapper>
    </Container>
  );
}
