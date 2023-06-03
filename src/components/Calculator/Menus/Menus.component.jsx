import { MenusContainer, ButtonContainer } from "./Menus.styles";
import { Button } from "../../Button/Button.component";

export const Menus = ({ resetHandler }) => {
  return (
    <MenusContainer>
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
    </MenusContainer>
  );
};
