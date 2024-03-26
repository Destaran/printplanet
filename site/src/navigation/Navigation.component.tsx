import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ppBlue } from "../utils/colors";
import { LoginLogout } from "./LoginLogout";

const Container = styled.div`
  width: 100%;
  user-select: none;
`;

const Header = styled.h1`
  text-align: center;
`;

const NavBar = styled.div`
  display: flex;
  padding: 2px 0;
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: ${ppBlue};
`;

const NavBarWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
  width: 68%;
  justify-content: space-between;
`;

const NavBarLeft = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavBarRight = styled.div`
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

  span {
    height: 16px;
  }
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

export function Navigation() {
  const location = useLocation();

  const checkPath = (path: string) => {
    if (path === location.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Container>
        <Header>PrintPlanet</Header>
        <NavBar>
          <NavBarWrapper>
            <NavBarLeft>
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
            </NavBarLeft>
            <NavBarRight>
              <LinkContainer>
                <LoginLogout />
              </LinkContainer>
            </NavBarRight>
          </NavBarWrapper>
        </NavBar>
      </Container>
      <Outlet />
    </>
  );
}
