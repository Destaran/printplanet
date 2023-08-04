import styled from "styled-components";
import { ProductIcon } from "./ProductIcon/ProductIcon.component";
import { MachineIcon } from "./MachineIcon/MachineIcon.component";

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

export const ListDiv = ({ outputItem }) => {
  return (
    <Wrapper>
      <Container>
        <ProductIcon outputItem={outputItem} />
        {outputItem.ingredients && <MachineIcon outputItem={outputItem} />}
      </Container>
    </Wrapper>
  );
};
