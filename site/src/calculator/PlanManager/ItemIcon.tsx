import styled from "styled-components";
import { getImageUrlById } from "utils/helperFunctions";
import { useDisplayNumber } from "utils/hooks/useDisplayNumber";
import { SummaryItem } from "utils/types";

const Container = styled.div``;

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
  background-color: ${({ theme }) => theme.colors.grey};
`;

const Image = styled.img`
  height: 36px;
  width: auto;
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
  item: SummaryItem;
}

export function ItemIcon({ item }: Props) {
  const imgUrl = getImageUrlById(item.id);
  const displayAmount = useDisplayNumber(item.amount);
  return (
    <Container>
      <InnerContainer>
        <ImgContainer>
          <Image src={imgUrl} />
          {displayAmount && <AmountText>{displayAmount}</AmountText>}
        </ImgContainer>
      </InnerContainer>
    </Container>
  );
}
