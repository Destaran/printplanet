import {
  formatNumber,
  returnImageUrlById,
} from "../../../utils/helperFunctions";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./ItemTreeMachineIcon.styles";

export const ItemTreeMachineIcon = ({ outputItem }) => {
  const imgUrl = returnImageUrlById("assembling-machine-1");
  const showAmount = formatNumber(outputItem.amount);

  return (
    <OutterElementContainer>
      <InnerElementContainer>
        <ImgContainer>
          <img src={imgUrl} />
          <p>{showAmount}</p>
        </ImgContainer>
      </InnerElementContainer>
    </OutterElementContainer>
  );
};
