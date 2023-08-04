import styled from "styled-components";
import { getImageUrlById, formatNumber } from "../../../utils/helperFunctions";

const OutterContainer = styled.div`
  border: 2px solid #b47500;
  height: 36px;
  width: 36px;
  padding: 2px;
  margin: 1px;
  background-color: #313131;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: orange;
  }
  &:active {
    background-color: #313131;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  object-fit: contain;
  img {
    height: 100%;
    width: auto;
  }
  p {
    position: absolute;
    font-size: 16px;
    bottom: 0;
    right: 0;
    margin: 0;
    color: white;
    text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
      -1px 0px 1px #000;
  }
`;

export const TooltipElement = ({ object }) => {
  const { amount, name } = object;
  const imgUrl = getImageUrlById(name);

  return (
    <OutterContainer>
      <InnerContainer>
        <ImgContainer>
          <img src={imgUrl} />
          {amount && <p>{formatNumber(amount)}</p>}
        </ImgContainer>
      </InnerContainer>
    </OutterContainer>
  );
};
