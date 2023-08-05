import styled from "styled-components";
import {
  getImageUrlById,
  formatNumber,
} from "../../../../utils/helperFunctions";

const OutterContainer = styled.div`
  border: 2px solid #b47500;
  height: 42px;
  width: auto;
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
`;

const AmountText = styled.p`
  position: absolute;
  font-size: ${({ fontSize }) => fontSize}px;
  bottom: -3px;
  right: -1px;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
`;

export const WindowItem = ({ item, handleClick }) => {
  const { amount, id } = item;
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);
  const fontSize = 14;
  const lengthExceedsLimit = JSON.stringify(displayAmount).length > 5;

  return (
    <>
      <OutterContainer
        onClick={(event) => {
          handleClick(id, event);
        }}
      >
        <InnerContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <AmountText
              lengthExceedsLimit={lengthExceedsLimit}
              fontSize={fontSize}
            >
              {displayAmount}
            </AmountText>
          </ImgContainer>
        </InnerContainer>
      </OutterContainer>
    </>
  );
};
