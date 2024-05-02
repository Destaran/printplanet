import styled from "styled-components";
import { Button } from "../../Button";
import { UnitSelect } from "./UnitSelect.component";

const Container = styled.div`
  width: 15%;
`;

const ButtonContainer = styled.div`
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
      <ButtonContainer>
        <Button onClick={addHandler}>
          <u>A</u>dd
        </Button>
      </ButtonContainer>
    </Container>
  );
};
