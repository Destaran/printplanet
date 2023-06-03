import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavDiv = styled.div``;

export const Header = styled.h1`
  text-align: center;
`;

export const NavBar = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: #14213d;
  padding: 2px;
`;

export const NavLink = styled(Link)`
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
