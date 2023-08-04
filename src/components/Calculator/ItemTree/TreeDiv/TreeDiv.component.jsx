import styled from "styled-components";
import { TreeFragment } from "./TreeFragment/TreeFragment.component";

const Container = styled.div`
  margin-bottom: 22.5px;
  padding: 5px;
  border: 1px solid grey;
`;

export const TreeDiv = ({ outputItem }) => {
  const { id: pid } = outputItem;

  return (
    <Container>
      <TreeFragment outputItem={outputItem} pid={pid} />
    </Container>
  );
};
