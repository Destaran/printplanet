import { ItemTreeListSpanContainer, Wrapper } from "./ItemTreeListSpan.styles";
import { getImageUrlById, formatNumber } from "../../../utils/helperFunctions";
import { ItemTreeIcon } from "../ItemTreeIcon/ItemTreeIcon.component";
import { ItemTreeMachineIcon } from "../ItemTreeMachineIcon/ItemTreeMachineIcon.component";

export const ItemTreeListSpan = ({ outputItem, handleClick }) => {
  const { amount, id } = outputItem;
  const imgUrl = getImageUrlById(id);
  const showAmount = formatNumber(amount);

  return (
    <Wrapper>
      <ItemTreeListSpanContainer>
        <ItemTreeIcon
          imgUrl={imgUrl}
          showAmount={showAmount}
          handleClick={handleClick}
        />
        {outputItem.ingredients && (
          <ItemTreeMachineIcon outputItem={outputItem} />
        )}
      </ItemTreeListSpanContainer>
    </Wrapper>
  );
};
