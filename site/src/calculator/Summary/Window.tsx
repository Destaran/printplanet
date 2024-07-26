import styled from "styled-components";
import { WindowItem } from "./WindowItem";
import { OutputItem, SummaryItem } from "utils/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  width: auto;
  max-width: max-content;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 4px;
`;

interface Props {
  title: string;
  items: OutputItem[] | SummaryItem[];
  handleClick: (id: string, event: React.MouseEvent) => void;
}

export function Window({ title, items, handleClick }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        {items.map((item, idx) => {
          return <WindowItem item={item} key={idx} handleClick={handleClick} />;
        })}
      </Wrapper>
    </Container>
  );
}
