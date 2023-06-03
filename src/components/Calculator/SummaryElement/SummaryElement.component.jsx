import {
  returnImageUrlById,
  formatNumber,
} from "../../../utils/helperFunctions";
import { useState } from "react";
import { SummaryElementPopup } from "../SummaryElementPopup/SummaryElementPopup.component";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
  NumberContainer,
} from "./SummaryElement.styles";

export const SummaryElement = ({ object }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { amount, id } = object;
  const imgUrl = returnImageUrlById(id);
  const displayAmount = formatNumber(amount);

  const removeItem = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <OutterElementContainer onClick={removeItem}>
        <InnerElementContainer>
          <ImgContainer>
            <img src={imgUrl} />
          </ImgContainer>
          <NumberContainer>
            <p>{displayAmount}</p>
          </NumberContainer>
        </InnerElementContainer>
      </OutterElementContainer>
      {showPopup && (
        <SummaryElementPopup object={object} setShowPopup={setShowPopup} />
      )}
    </>
  );
};
