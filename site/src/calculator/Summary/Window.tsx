import styled from "styled-components";
import { WindowItem } from "./WindowItem";
import { OutputItem, SummaryItem } from "utils/types";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-width: auto;
  margin-bottom: 10px;
`;

const WrapperWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.blue};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4px;
  max-width: 100%;
`;

interface Props {
  title: string;
  items: OutputItem[] | SummaryItem[];
  handleClick: (id: string, event: React.MouseEvent) => void;
}

export function Window({ title, items, handleClick }: Props) {
  return (
    <Container>
      <p>{title}</p>
      <WrapperWrapper>
        <Wrapper>
          {items.map((item, idx) => {
            return (
              <WindowItem item={item} key={idx} handleClick={handleClick} />
            );
          })}
        </Wrapper>
      </WrapperWrapper>
    </Container>
  );
}
