import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const MountAnimation = keyframes`
from {
  max-height: 0;
  overflow: hidden;
}
to {
  max-height: 1000px;
}
`;

const Header = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 0;
  font-size: 1em;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 0px;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkOrange};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }

  svg {
    margin-right: 5px;
  }
`;

const Wrapper = styled.div`
  animation: ${MountAnimation} 1s;
`;

interface Props {
  children: React.ReactNode;
  name: string;
}

export function Section({ children, name }: Props) {
  const [active, setActive] = useState(true);

  function handleClick() {
    setActive(!active);
  }

  return (
    <>
      <Header onClick={handleClick}>
        {active ? (
          <MdKeyboardArrowDown size={"1.25em"} />
        ) : (
          <MdKeyboardArrowUp size={"1.25em"} />
        )}
        {name}
      </Header>
      {active && <Wrapper>{children}</Wrapper>}
    </>
  );
}
