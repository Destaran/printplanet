import styled from "styled-components";
import { Button } from "../../components/Button";
import { UnitSelect } from "./UnitSelect";
import { ChangeEvent } from "react";

const Container = styled.div`
  width: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const StyledButton = styled(Button)`
  margin: 0;
  height: 32px;
  width: 100%;
  border-radius: 0;
`;

interface Props {
  unit: number;
  handleUnitChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addHandler: () => void;
}

export function UnitSelection({ unit, handleUnitChange, addHandler }: Props) {
  return (
    <Container>
      <UnitSelect value={unit} onChange={handleUnitChange} />
      <Wrapper>
        <StyledButton onClick={addHandler}>Add</StyledButton>
      </Wrapper>
    </Container>
  );
}
