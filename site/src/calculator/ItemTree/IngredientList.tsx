import styled from "styled-components";
import { TreeFragment } from "./TreeFragment";
import { OutputItem } from "utils/types";

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  z-index: 9;

  li:last-child {
    position: relative;
    border-color: transparent;
  }

  li:last-child::after {
    content: "";
    position: absolute;
    display: flex;
    height: 28px;
    left: -2px;
    border-left: 2px solid black;
    top: 0px;
    width: 2px;
  }

  li::before {
    content: "";
    display: block;
    position: relative;
    top: 26px;
    left: -50px;
    width: 50px;
    border: solid black 1px;
  }
`;

interface Props {
  ingredients: OutputItem[];
  pid: string;
}

export function IngredientList({ ingredients, pid }: Props) {
  return (
    <StyledList>
      {ingredients.map((outputItem, idx) => {
        return (
          <TreeFragment outputItem={{ ...outputItem }} key={idx} pid={pid} />
        );
      })}
    </StyledList>
  );
}
