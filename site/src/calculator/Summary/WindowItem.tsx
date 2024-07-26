import styled from "styled-components";
import { getImageUrlById } from "../../utils/helperFunctions";
import { useDisplayNumber } from "utils/useDisplayNumber";

const OutterContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.darkOrange};
  height: 48px;
  width: 48px;
  padding: 2px;
  margin: 1px;
  background-color: ${({ theme }) => theme.colors.grey};
  user-select: none;
  cursor: pointer;
  transition: all 1s;

  &:hover {
    transition: all 0.2s;
    background-color: orange;
    border: 2px solid #efefef;
    transform: translateY(-3px);
  }

  &:active {
    transition: all 0.2s;
    img {
      transform: scale(0.8);
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

interface Props {
  item: { amount: number; id: string };
  handleClick: (id: string, event: React.MouseEvent) => void;
}

export function WindowItem({ item, handleClick }: Props) {
  const { amount, id } = item;
  const imgUrl = getImageUrlById(id);
  const displayAmount = useDisplayNumber(amount);

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
}
