import { ItemTreeListSpanContainer, Wrapper } from "./ItemTreeListSpan.styles";
import { ItemTreeIcon } from "../ItemTreeIcon/ItemTreeIcon.component";
import { ItemTreeMachineIcon } from "../ItemTreeMachineIcon/ItemTreeMachineIcon.component";

export const ItemTreeListSpan = ({ outputItem }) => {
  return (
    <Wrapper>
      <ItemTreeListSpanContainer>
        <ItemTreeIcon outputItem={outputItem} />
        {outputItem.ingredients && (
          <ItemTreeMachineIcon outputItem={outputItem} />
        )}
      </ItemTreeListSpanContainer>
    </Wrapper>
  );
};
