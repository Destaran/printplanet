import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LoginLogout } from "./LoginLogout";
import { ppBlue } from "../utils/colors";

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

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: auto;
  margin: 2px 15px 2px 15px;
`;

interface NavlinkProps {
  $isactive: boolean;
}

const NavLink = styled(Link)<NavlinkProps>`
  margin: 0;
  text-decoration: none;
  padding: 0px;
  cursor: pointer;
  transition: all 1s;
  color: ${({ $isactive }) => ($isactive ? "orange" : "white")};

  &:hover {
    color: ${({ color }) => (color ? color : "orange")};
    transition: all 0.3s;
  }

  &:active {
    transform: scale(0.95);
    color: white;
    transition: all 0.03s;
  }
`;

export function NavBar() {
  const location = useLocation();

  const checkPath = (path: string) => {
    if (path === location.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <LinkContainer>
            <NavLink to="/guide" $isactive={checkPath("/guide")}>
              Guide
            </NavLink>
          </LinkContainer>
          <LinkContainer>
            <NavLink to="/calculator" $isactive={checkPath("/calculator")}>
              Calculator
            </NavLink>
          </LinkContainer>
          <LinkContainer>
            <NavLink to="/about" $isactive={checkPath("/about")}>
              About
            </NavLink>
          </LinkContainer>
        </LeftSide>
        <RightSide>
          <LinkContainer>
            <LoginLogout />
          </LinkContainer>
        </RightSide>
      </Wrapper>
    </Container>
  );
}
