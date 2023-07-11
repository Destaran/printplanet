import { formatNumber, getImageUrlById } from "../../../utils/helperFunctions";
import { useState } from "react";
import { SummaryElementPopup } from "../SummaryElementPopup/SummaryElementPopup.component";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./SummaryElement.styles";

export const SummaryElement = ({ object }) => {
  const { amount, id } = object;
  const [showPopup, setShowPopup] = useState(false);
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <OutterElementContainer onClick={handleClick}>
        <InnerElementContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <p>{displayAmount}</p>
          </ImgContainer>
        </InnerElementContainer>
      </OutterElementContainer>
      {showPopup && (
        <SummaryElementPopup object={object} setShowPopup={setShowPopup} />
      )}
    </>
  );
};
