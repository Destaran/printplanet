import styled from "styled-components";
import { ProductIcon } from "./ProductIcon";
import { MachineIcon } from "./MachineIcon";
import { OutputItem } from "utils/types";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;

  position: sticky;
  top: 0;
  z-index: 10;
`;

const Container = styled.div`
  display: inline-flex;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: black;
  user-select: none;
  align-items: top;
  justify-content: center;
`;

interface Props {
  outputItem: OutputItem;
  pid: string;
}

export function Group({ outputItem, pid }: Props) {
  return (
    <Wrapper>
      <Container>
        <ProductIcon outputItem={outputItem} />
        {outputItem.ingredients && (
          <MachineIcon outputItem={outputItem} pid={pid} />
        )}
      </Container>
    </Wrapper>
  );
}
