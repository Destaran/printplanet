import { MenusContainer, ButtonContainer } from "./CalculatorMenus.styles";

const CalculatorMenus = ({ resetHandler }) => {
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

export default CalculatorMenus;
