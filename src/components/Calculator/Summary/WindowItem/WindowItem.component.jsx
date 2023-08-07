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
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: orange;
    border: 2px solid #efefef;
    transform: translateY(-3px);
  }
  &:active {
    transition: all 0.1s;
    background-color: #313131;
    img {
      transform: scale(0.9);
    }
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
  font-size: 14px;
  bottom: -3px;
  right: -1px;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
`;

// refactor: remove dynamic AmountText sizing
export const WindowItem = ({ item, handleClick }) => {
  const { amount, id } = item;
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);

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
            <AmountText>{displayAmount}</AmountText>
          </ImgContainer>
        </InnerContainer>
      </OutterContainer>
    </>
  );
};
