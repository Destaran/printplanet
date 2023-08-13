import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signOutAuthUser } from "../../utils/firestore/firestore";
import { Link } from "react-router-dom";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDocument,
} from "../../utils/firestore/firestore";
import { storeUser } from "../../reduxStore/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";

const Container = styled.div``;

const Header = styled.h1`
  text-align: center;
`;

const NavBar = styled.div`
  display: flex;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: #14213d;
  padding: 2px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 20px;
  width: 68px;
  margin: 2px 15px 2px 15px;
  align-items: center;
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

const Navigation = () => {
  const navigate = useNavigate();
  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOutAuthUser();
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
          {user ? (
            <>
              <LinkContainer>
                <NavLink as="span" onClick={handleLogout} color={"red"}>
                  Logout
                </NavLink>
              </LinkContainer>
              <LinkContainer>
                <NavLink to="/profile">Profile</NavLink>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer>
              <NavLink to="/login">Login</NavLink>
            </LinkContainer>
          )}
          <LinkContainer>
            <NavLink to="/calculator">Calculator</NavLink>
          </LinkContainer>
        </NavBar>
      </Container>
      <Outlet />
    </>
  );
};

export default Navigation;
