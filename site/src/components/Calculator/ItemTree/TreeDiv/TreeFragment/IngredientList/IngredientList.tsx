import styled from "styled-components";
import { TreeFragment } from "../TreeFragment";
import { OutputItem } from "utils/types";

const UnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  z-index: 9;

  li:last-child {
    position: relative;
    border-color: transparent;
  }

  // last child horizontal half
  li:last-child::after {
    content: "";
    position: absolute;
    display: flex;
    height: 22px;
    left: -2px;
    border-left: 2px solid black;
    top: 0px;
    width: 2px;
  }

  // vertical lines
  li::before {
    content: "";
    display: block;
    position: relative;
    top: 20px;
    left: -50px;
    width: 75px;
    border: solid black 1px;
  }
`;

interface Props {
  ingredients: OutputItem[];
  pid: string;
}

export function IngredientList({ ingredients, pid }: Props) {
  return (
    <UnorderedList>
      {ingredients.map((outputItem, idx) => {
        return (
          <TreeFragment outputItem={{ ...outputItem }} key={idx} pid={pid} />
        );
      })}
    </UnorderedList>
  );
}
