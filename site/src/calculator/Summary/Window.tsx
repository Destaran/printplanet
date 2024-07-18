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
`;

const WindowContainer = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
  animation: ${MountAnimation} 0.5s ease-out;
  width: 100%;
  margin-bottom: 10px;
`;

const WindowOutter = styled.div`
  display: inline-flex;
  height: auto;
  align-items: center;
  justify-content: center;
  border: 1px black solid;
  background-color: ${({ theme }) => theme.colors.blue};
  margin: 0;
  padding: 4px;
  max-width: 100%;
`;

const WindowInner = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-auto-flow: column;
  border: 1px black solid;
  background-color: ${({ theme }) => theme.colors.grey};
  max-width: 100%;
  height: auto;
`;

const Title = styled.div`
  padding: 0 5px;
  font-size: 1em;
  width: 100%;
  text-align: left;
  border-radius: 0px;
  background-color: ${({ theme }) => theme.colors.darkOrange};
  color: ${({ theme }) => theme.colors.lightGrey};
`;

interface Props {
  title: string;
  items: OutputItem[] | SummaryItem[];
  handleClick: (id: string, event: React.MouseEvent) => void;
}

export function Window({ title, items, handleClick }: Props) {
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
}
