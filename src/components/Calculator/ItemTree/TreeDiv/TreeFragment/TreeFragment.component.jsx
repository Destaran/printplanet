import styled from "styled-components";
import { ListDiv } from "./ListDiv/ListDiv.component";
import { outputObject } from "../../../../../reduxStore/calculator/calculator.selector";
import { IngredientList } from "./IngredientList/IngredientList.component";
import { useSelector } from "react-redux";

const ListElement = styled.li`
  padding: 0;
  margin: 0 0 0 45px;
  list-style: none;
  border-left: 2px solid black;
  padding-left: 50px;
`;
export const TreeFragment = ({ outputItem, pid }) => {
  const { ingredients } = outputItem;
  const output = useSelector(outputObject);
  const firstRender = outputItem.uid !== output[pid].uid;

  return (
    <>
      {firstRender ? (
        <ListElement>
          <ListDiv outputItem={outputItem} />
          {ingredients && (
            <IngredientList ingredients={ingredients} pid={pid} />
          )}
        </ListElement>
      ) : (
        <>
          <ListDiv outputItem={outputItem} />
          {ingredients && (
            <IngredientList ingredients={ingredients} pid={pid} />
          )}
        </>
      )}
    </>
  );
};
