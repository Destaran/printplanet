import styled from "styled-components";
import { ItemTreeFragment } from "../ItemTreeFragment/ItemTreeFragment.component";

const Container = styled.div`
  margin-bottom: 22.5px;
  padding: 5px;
  border: 1px solid grey;
`;

export const ItemTreeDiv = ({ outputItem }) => {
  const { id: pid } = outputItem;

  return (
    <Container>
      <ItemTreeFragment outputItem={outputItem} pid={pid} />
    </Container>
  );
};
