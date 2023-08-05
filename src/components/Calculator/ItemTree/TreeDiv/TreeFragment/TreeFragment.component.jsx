import styled from "styled-components";
import { ListDiv } from "./ListDiv/ListDiv.component";
import { IngredientList } from "./IngredientList/IngredientList.component";

const ListElement = styled.li`
  padding: 0;
  margin: 0 0 0 44px;
  list-style: none;
  border-left: 2px solid black;
  padding-left: 50px;
`;
// refactor: should be called ListElement and TreeFragment should be ListDiv
export const TreeFragment = ({ outputItem, pid }) => {
  const { ingredients } = outputItem;
  const firstRender = outputItem.id !== pid;

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
