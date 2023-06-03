import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
  NumberContainer,
  ItemTreeListSpanContainer,
} from "./ItemTreeListSpan.styles";

import {
  returnImageUrlById,
  formatNumber,
} from "../../../utils/helperFunctions";

export const ItemTreeListSpan = ({ outputItem, handleClick }) => {
  const { amount, id } = outputItem;
  const imgUrl = returnImageUrlById(id);
  const showAmount = formatNumber(amount);

  return (
    <>
      <ItemTreeListSpanContainer>
        <OutterElementContainer onClick={handleClick}>
          <InnerElementContainer>
            <ImgContainer>
              <img src={imgUrl} />
            </ImgContainer>
            <NumberContainer>
              <p>{showAmount}</p>
            </NumberContainer>
          </InnerElementContainer>
        </OutterElementContainer>
      </ItemTreeListSpanContainer>
    </>
  );
};
