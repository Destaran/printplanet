import { MenusContainer, ButtonContainer } from "./Menus.styles";

export const Menus = ({ resetHandler }) => {
  return (
    <MenusContainer>
      <ButtonContainer>
        <button onClick={resetHandler}>Reset</button>
      </ButtonContainer>
      <ButtonContainer>
        <button>Save</button>
      </ButtonContainer>
      <ButtonContainer>
        <button>Load</button>
      </ButtonContainer>
    </MenusContainer>
  );
};
