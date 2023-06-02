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
  const { amount, id } = object;
  const [showPopup, setShowPopup] = useState(false);
  const imgUrl = returnImageUrlById(id);
  const showAmount = formatNumber(amount);

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
            <p>{showAmount}</p>
          </NumberContainer>
        </InnerElementContainer>
      </OutterElementContainer>
      {showPopup && (
        <SummaryElementPopup object={object} setShowPopup={setShowPopup} />
      )}
    </>
  );
};
