import { ItemTreeListSpanContainer } from "./ItemTreeListSpan.styles";

import {
  returnImageUrlById,
  formatNumber,
} from "../../../utils/helperFunctions";

import { ItemTreeIcon } from "../ItemTreeIcon/ItemTreeIcon.component";

export const ItemTreeListSpan = ({ outputItem, handleClick }) => {
  const { amount, id } = outputItem;
  const imgUrl = returnImageUrlById(id);
  const showAmount = formatNumber(amount);

  return (
    <>
      <ItemTreeListSpanContainer>
        <ItemTreeIcon
          imgUrl={imgUrl}
          showAmount={showAmount}
          handleClick={handleClick}
        />
      </ItemTreeListSpanContainer>
    </>
  );
};
