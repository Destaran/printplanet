import styled from "styled-components";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDocument,
  signOutAuthUser,
} from "../../utils/firestore/firestore";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../../reduxStore/user/user.slice";
import { currentUser } from "../../reduxStore/user/user.selector";
import { ImExit } from "react-icons/im";

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
  color: white;
  text-decoration: none;
  padding: 0px;
  cursor: pointer;
  transition: all 1s;

  &:hover {
    color: ${({ color }) => (color ? color : "orange")};
    text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
      -1px 0px 1px #000;
    transition: all 0.3s;
  }

  &:active {
    transform: scale(1.05);
    color: white;
    transition: all 0.03s;
  }
`;

// refactor

export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const handleLogout = () => {
    signOutAuthUser();
    dispatch(storeUser(null));
    navigate("/login");
  };

  useEffect(() => {
    async function dispatchCurrentUser(user) {
      const userDocument = await getUserDocument(user);
      const payload = {
        displayName: userDocument.displayName,
        email: userDocument.email,
      };
      dispatch(storeUser(payload));
    }
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatchCurrentUser(user);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Container>
        <Header>PrintPlanet</Header>
        <NavBar>
          <NavBarWrapper>
            <NavBarLeft>
              <LinkContainer>
                <NavLink to="/calculator">Calculator</NavLink>
              </LinkContainer>
              <LinkContainer>
                <NavLink to="/guide">Guide</NavLink>
              </LinkContainer>
              <LinkContainer>
                <NavLink to="/about">About</NavLink>
              </LinkContainer>
            </NavBarLeft>
            <NavBarRight>
              {user ? (
                <>
                  <NavLink to="/profile">
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
                  <NavLink to="/login">Login</NavLink>
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
