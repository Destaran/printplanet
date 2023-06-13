import {
  returnImageUrlById,
  formatNumber,
} from "../../../utils/helperFunctions";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./SelectRecipePopupButtonTooltipElement.styles";

export const SelectRecipePopupButtonTooltipElement = ({ object }) => {
  const { amount, name } = object;
  const imgUrl = returnImageUrlById(name);

  return (
    <OutterElementContainer>
      <InnerElementContainer>
        <ImgContainer>
          <img src={imgUrl} />
          {amount && <p>{formatNumber(amount)}</p>}
        </ImgContainer>
      </InnerElementContainer>
    </OutterElementContainer>
  );
};
