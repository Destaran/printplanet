import styled from "styled-components";
import { ItemTreeFragment } from "../ItemTreeFragment/ItemTreeFragment.component";

const ListElement = styled.li`
  padding: 0;
  margin: 0 0 0 44px;
  list-style: none;
  border-left: 2px solid black;
  padding-left: 50px;
`;

export const ItemTreeListElement = ({ outputItem, pid }) => {
  return (
    <ListElement>
      <ItemTreeFragment outputItem={outputItem} pid={pid} />
    </ListElement>
  );
};
