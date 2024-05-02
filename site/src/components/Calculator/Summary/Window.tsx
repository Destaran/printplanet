import styled, { keyframes } from "styled-components";
import { WindowItem } from "./WindowItem";
import { OutputItem, SummaryItem } from "utils/types";

const MountAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const Container = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
`;

const WindowContainer = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
  animation: ${MountAnimation} 0.5s ease-out;
`;

const WindowOutter = styled.div`
  display: inline-flex;
  height: auto;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border: 1px black solid;
  background-color: ${({ theme }) => theme.colors.blue};
  margin: 0;
  padding: 4px;
`;

const WindowInner = styled.div`
  display: grid;
  grid-template-columns: repeat(10, auto);
  border: 1px black solid;
  background-color: ${({ theme }) => theme.colors.grey};
  width: 100%;
  height: auto;
`;

const Title = styled.p`
  margin: 0;
`;

interface Props {
  title: string;
  items: OutputItem[] | SummaryItem[];
  handleClick: any;
}

export const Window = ({ title, items, handleClick }: Props) => {
  return (
    <Container>
      <WindowContainer>
        <Title>{title}</Title>
        <WindowOutter>
          <WindowInner>
            {items.map((item, idx) => {
              return (
                <WindowItem item={item} key={idx} handleClick={handleClick} />
              );
            })}
          </WindowInner>
        </WindowOutter>
      </WindowContainer>
    </Container>
  );
};
