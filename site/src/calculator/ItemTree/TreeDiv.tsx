import styled from "styled-components";
import { TreeFragment } from "./TreeFragment";
import { OutputItem } from "utils/types";

const Container = styled.div`
  margin: 20px 0;
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
