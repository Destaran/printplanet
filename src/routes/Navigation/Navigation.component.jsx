import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";
import { signOutAuthUser } from "../../utils/firestore/firestore";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Container = styled.div``;

const Header = styled.h1`
  text-align: center;
`;

const NavBar = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: #14213d;
  padding: 2px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 5px 15px 5px 15px;
  padding: 0px;
  cursor: pointer;

  &:hover {
    color: orange;
  }

  &:active {
    color: white;
  }
`;

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutAuthUser();
    navigate("/login");
  };

  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Container>
        <Header>PrintPlanet</Header>
        <NavBar>
          {currentUser ? (
            <>
              <NavLink as="span" onClick={handleLogout}>
                Logout
              </NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
          <NavLink to="/calculator">Calculator</NavLink>
        </NavBar>
      </Container>
      <Outlet />
    </>
  );
};

export default Navigation;
