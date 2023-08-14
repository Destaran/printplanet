import styled from "styled-components";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDocument,
  signOutAuthUser,
} from "../../utils/firestore/firestore";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeUser } from "../../reduxStore/user/user.slice";
import { currentUser } from "../../reduxStore/user/user.selector";
import { ImExit } from "react-icons/im";
import { store } from "../../reduxStore/store";

const Container = styled.div`
  width: 100%;
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
  background-color: #14213d;
`;

const NavBarWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0;
  width: 89%;
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

const NavLink = styled(Link)`
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

// refactor

const dispatchCurrentUser = async (user) => {
  const userDocument = await getUserDocument(user);
  store.dispatch(storeUser(userDocument));
};

onAuthStateChangedListener((user) => {
  if (user) {
    createUserDocumentFromAuth(user);
    dispatchCurrentUser(user);
  } else {
    store.dispatch(storeUser(null));
  }
});

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(currentUser);

  const handleLogout = () => {
    signOutAuthUser();
    navigate("/login");
  };

  const checkPath = (path) => {
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
              {user ? (
                <>
                  <NavLink to="/profile" $isactive={checkPath("/profile")}>
                    <LinkContainer>{user.displayName}</LinkContainer>
                  </NavLink>
                  <LinkContainer>
                    <NavLink as="span" onClick={handleLogout} color={"red"}>
                      <ImExit />
                    </NavLink>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer>
                  <NavLink to="/login" $isactive={checkPath("/login")}>
                    Login
                  </NavLink>
                </LinkContainer>
              )}
            </NavBarRight>
          </NavBarWrapper>
        </NavBar>
      </Container>
      <Outlet />
    </>
  );
};
