import { getImageUrlById } from "../../../utils/helperFunctions";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./ItemTreeMachineIcon.styles";

export const ItemTreeMachineIcon = ({ outputItem }) => {
  const imgUrl = getImageUrlById(outputItem.machine.id);
  const showAmount = Math.ceil(outputItem.machine.amount);

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
