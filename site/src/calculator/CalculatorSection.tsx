import { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Header = styled.button`
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
`;

interface Props {
  children: React.ReactNode;
  name: string;
}

export function CalculatorSection({ children, name }: Props) {
  const [active, setActive] = useState(true);

  function handleClick() {
    setActive(!active);
  }

  return (
    <>
      <Header onClick={handleClick}>
        {active ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        {name}
      </Header>
      {active && children}
    </>
  );
}
