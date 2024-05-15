import styled from "styled-components";
import { Button } from "../../Button";
import { UnitSelect } from "./UnitSelect";

const Container = styled.div`
  width: 5%;
`;

const ButtonWrapper = styled.div`
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

interface Props {
  unit: number;
  handleUnitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addHandler: () => void;
}

export function UnitSelection({ unit, handleUnitChange, addHandler }: Props) {
  return (
    <Container>
      <UnitSelect value={unit} onChange={handleUnitChange} />
      <ButtonWrapper>
        <Button onClick={addHandler}>
          <u>A</u>dd
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
