import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
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
  useLocation();
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <Wrapper>
        <SideWrapper>
          <Button destination="configurator" title="Config" />
          <Button destination="calculator" title="Calculator" />
        </SideWrapper>
        <SideWrapper>
          <Button destination="guide" title="Guide" />
          <Button destination="about" title="About" />
          {isAuthenticated ? (
            <>
              <Button destination="profile" title="Profile" />
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
