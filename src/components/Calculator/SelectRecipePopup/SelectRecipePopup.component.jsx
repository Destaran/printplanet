import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToOutput } from "../../../reduxStore/calculator/calculator.slice";
import { SelectButton } from "./SelectButton.component";
import { Button } from "../../Button/Button.component";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const InnerContainer = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 8px;
  width: 100%;
  max-width: 440px;
  background-color: white;
`;

export const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 8px;
  }
`;

export const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: red;
`;

// refactor
export const SelectRecipePopup = ({
  currentItem,
  quantity,
  setShowPopup,
  recipes,
  resetOptions,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [didntSelect, setDidntSelect] = useState(false);
  const dispatch = useDispatch();

  const handleSelectRecipe = ({ target }) => {
    const { id } = target;
    setSelectedRecipe(id);
  };

  const handleSelect = () => {
    if (selectedRecipe) {
      const itemToAdd = {
        id: currentItem,
        amount: Number(quantity),
        recipe: selectedRecipe,
      };
      dispatch(addToOutput(itemToAdd));
      setShowPopup(false);
      setDidntSelect(false);
      setSelectedRecipe({});
      resetOptions();
    } else {
      setDidntSelect(true);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedRecipe({});
    setDidntSelect(false);
  };

  return (
    <Container>
      <InnerContainer>
        <Header>
          <p>Select Recipe</p>
        </Header>
        <InputContainer>
          {recipes.map((recipe, idx) => (
            <SelectButton
              onClick={handleSelectRecipe}
              selectedRecipe={selectedRecipe}
              recipe={recipe}
              key={idx}
            />
          ))}
        </InputContainer>
        {didntSelect && <Warning>Select a recipe to continue!</Warning>}
        <ButtonsContainer>
          <Button onClick={handleSelect} buttonType={"green"}>
            [E]nter
          </Button>
          <Button onClick={handleCancel} buttonType={"red"}>
            [B]ack
          </Button>
        </ButtonsContainer>
      </InnerContainer>
    </Container>
  );
};
