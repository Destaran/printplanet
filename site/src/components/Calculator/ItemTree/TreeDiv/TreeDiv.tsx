import styled from "styled-components";
import { TreeFragment } from "./TreeFragment/TreeFragment.component";
import { OutputItem } from "utils/types";

const Container = styled.div`
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid grey;
`;

interface Props {
  outputItem: OutputItem;
}

export function TreeDiv({ outputItem }: Props) {
  const { id: pid } = outputItem;

  return (
    <Container>
      <TreeFragment outputItem={outputItem} pid={pid} />
    </Container>
  );
}
