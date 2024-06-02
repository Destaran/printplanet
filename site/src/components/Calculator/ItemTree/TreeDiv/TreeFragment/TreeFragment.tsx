import styled from "styled-components";
import { ListDiv } from "./ListDiv/ListDiv";
import { outputObject } from "../../../../../redux/calculator/calculator.selector";
import { IngredientList } from "./IngredientList/IngredientList";
import { useSelector } from "react-redux";
import { OutputItem } from "utils/types";

const ListElement = styled.li`
  padding: 0;
  margin: 0 0 0 45px;
  list-style: none;
  border-left: 2px solid black;
  padding-left: 50px;
`;

interface Props {
  outputItem: OutputItem;
  pid: string;
}

export function TreeFragment({ outputItem, pid }: Props) {
  const { ingredients } = outputItem;
  const output = useSelector(outputObject);
  const firstRender = outputItem.uid !== output[pid].uid;

  return (
    <>
      {firstRender ? (
        <ListElement>
          <ListDiv outputItem={outputItem} pid={pid} />
          {ingredients && (
            <IngredientList ingredients={ingredients} pid={pid} />
          )}
        </ListElement>
      ) : (
        <>
          <ListDiv outputItem={outputItem} pid={pid} />
          {ingredients && (
            <IngredientList ingredients={ingredients} pid={pid} />
          )}
        </>
      )}
    </>
  );
}
