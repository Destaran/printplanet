import styled from "styled-components";
import { ItemTreeIcon } from "../ItemTreeIcon/ItemTreeIcon.component";
import { ItemTreeMachineIcon } from "../ItemTreeMachineIcon/ItemTreeMachineIcon.component";

const Wrapper = styled.div`
  margin: 0;
  padding: 0 0 0 0;
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

export const ItemTreeListSpan = ({ outputItem }) => {
  return (
    <Wrapper>
      <Container>
        <ItemTreeIcon outputItem={outputItem} />
        {outputItem.ingredients && (
          <ItemTreeMachineIcon outputItem={outputItem} />
        )}
      </Container>
    </Wrapper>
  );
};
