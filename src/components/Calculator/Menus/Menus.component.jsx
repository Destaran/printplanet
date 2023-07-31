import styled from "styled-components";
import { Button } from "../../Button/Button.component";

const ppBlue = "#14213d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 10%;
  border: 1px solid ${ppBlue};
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  button {
    margin: 2px;
    height: 28px;
  }
`;
export const Menus = ({ resetHandler }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button buttonType={"green"}>Save</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button>Load</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={resetHandler} buttonType={"red"}>
          Reset
        </Button>
      </ButtonContainer>
    </Container>
  );
};
