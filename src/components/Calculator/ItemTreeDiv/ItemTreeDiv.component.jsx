import { ItemTreeFragment } from "../ItemTreeFragment/ItemTreeFragment.component";
import { ItemTreeContainer } from "./ItemTreeDiv.styles";

export const ItemTreeDiv = ({ outputItem }) => {
  const parentId = outputItem.id;
  return (
    <ItemTreeContainer>
      <ItemTreeFragment outputItem={outputItem} pid={parentId} />
    </ItemTreeContainer>
  );
};
