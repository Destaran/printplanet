import styled from "styled-components";
import { Button } from "../../../../Button/Button.component";
import { UnitSelect } from "./UnitSelect.component";

const Container = styled.div`
  width: 15%;
  select {
    height: 43px;
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  button {
    margin: 0;
    height: 32px;
    width: 100%;
    border-radius: 0;
  }
`;

export const UnitSelection = ({ unit, handleUnitChange, addHandler }) => {
  return (
    <Container>
      <UnitSelect value={unit} onChange={handleUnitChange} />
      <AddButtonContainer>
        <Button onClick={addHandler}>[A]dd</Button>
      </AddButtonContainer>
    </Container>
  );
};
