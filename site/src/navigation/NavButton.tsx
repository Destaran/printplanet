import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
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

interface Props {
  destination: string;
}

function checkPath(path: string) {
  if (path === location.pathname) {
    return true;
  } else {
    return false;
  }
}

export function NavButton({ destination }: Props) {
  const title = destination.charAt(0).toUpperCase() + destination.slice(1);
  return (
    <Wrapper>
      <NavLink to={`/${destination}`} $isactive={checkPath(`/${destination}`)}>
        {title}
      </NavLink>
    </Wrapper>
  );
}
