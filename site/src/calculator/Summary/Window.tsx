import styled from "styled-components";
import { WindowItem } from "./WindowItem";
import { OutputItem, SummaryItem } from "utils/types";

const Container = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
  display: flex;
  justify-content: start;
`;

const WindowContainer = styled.div`
  width: 100%;
  height: auto;
  min-width: auto;
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

const TitleContainer = styled.div`
  font-size: 1em;
  width: 100%;
  text-align: left;
  border-radius: 0px;
  color: ${({ theme }) => theme.colors.black};
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
        <TitleContainer>
          <p>{title}</p>
        </TitleContainer>
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
