import styled from "styled-components";
import { getImageUrlById } from "utils/helperFunctions";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

const StyledText = styled.p`
  margin: 0;
  color: white;
  font-size: 16px;
`;

const StyledImg = styled.img`
  height: 24px;
  width: auto;
  margin: 0 5px 0 5px;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 1px solid ${({ theme }) => theme.colors.orange};
`;

interface Props {
  currentItem: string | null;
}

export function CurrentIndicator({ currentItem }: Props) {
  return (
    <Container>
      {currentItem ? (
        <>
          <StyledText>Selected Product:</StyledText>
          <StyledImg src={getImageUrlById(currentItem)} alt={currentItem} />
        </>
      ) : (
        <StyledText>No product selected</StyledText>
      )}
    </Container>
  );
}
