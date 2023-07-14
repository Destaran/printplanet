import { getImageUrlById, formatNumber } from "../../../utils/helperFunctions";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./SummaryElement.styles";

export const SummaryElement = ({ item, handleClick }) => {
  const { amount, id } = item;
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);

  return (
    <>
      <OutterElementContainer
        onClick={(event) => {
          handleClick(id, event);
        }}
      >
        <InnerElementContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <p>{displayAmount}</p>
          </ImgContainer>
        </InnerElementContainer>
      </OutterElementContainer>
    </>
  );
};
