import { ItemTreeFragment } from "../ItemTreeFragment/ItemTreeFragment.component";
import { ItemTreeContainer } from "./ItemTreeDiv.styles";

export const ItemTreeDiv = ({ outputItem }) => {
  const { id: pid } = outputItem;

  return (
    <ItemTreeContainer>
      <ItemTreeFragment outputItem={outputItem} pid={pid} />
    </ItemTreeContainer>
  );
};
