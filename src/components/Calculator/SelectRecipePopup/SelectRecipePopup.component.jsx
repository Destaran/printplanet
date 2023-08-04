import styled from "styled-components";
import { getRecipes } from "../../../utils/helperFunctions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToOutput,
  extendElement,
  extendSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import { SelectButton } from "./SelectButton.component";
import { Button } from "../../Button/Button.component";
import { useCallback } from "react";

const Container = styled.div`
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

const InnerContainer = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 8px;
  width: 100%;
  max-width: 440px;
  background-color: white;
`;

const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 8px;
  }
`;

const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: red;
`;

// refactor
export const SelectRecipePopup = ({ id, setId, uid, addInfo }) => {
  const dispatch = useDispatch();
  const recipes = getRecipes(id);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [warning, setWarning] = useState(false);

  const resetComponent = useCallback(() => {
    setId(null);
    setWarning(false);
    setSelectedRecipe("");
  }, [setId]);

  const handleEnter = useCallback(() => {
    if (selectedRecipe && addInfo) {
      const { quantity, resetItemSelect } = addInfo;
      const payload = {
        id,
        amount: Number(quantity),
        recipe: selectedRecipe,
      };
      dispatch(addToOutput(payload));
      resetItemSelect();
      resetComponent();
    } else if (selectedRecipe && !uid) {
      const payload = {
        id,
        recipe: selectedRecipe,
      };
      dispatch(extendSameTypeElements(payload));
      resetComponent();
    } else if (selectedRecipe) {
      const payload = {
        uid,
        recipe: selectedRecipe,
      };
      dispatch(extendElement(payload));
      resetComponent();
    } else {
      setWarning(true);
    }
  }, [addInfo, dispatch, id, resetComponent, selectedRecipe, uid]);

  const handleBack = useCallback(() => {
    resetComponent();
  }, [resetComponent]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "e") {
        handleEnter();
      }
      if (event.key === "b") {
        handleBack();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBack, handleEnter]);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <p>Select Recipe</p>
        </Header>
        <InputContainer>
          {recipes.map((recipe, idx) => {
            const shortcut = JSON.stringify(Number(idx) + 1);
            return (
              <SelectButton
                key={idx}
                recipe={recipe}
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
                handleEnter={handleEnter}
                shortcut={shortcut}
              />
            );
          })}
        </InputContainer>
        {warning && <Warning>Select a recipe to continue!</Warning>}
        <ButtonsContainer>
          <Button onClick={handleEnter} buttonType={"green"}>
            [E]nter
          </Button>
          <Button onClick={handleBack} buttonType={"red"}>
            [B]ack
          </Button>
        </ButtonsContainer>
      </InnerContainer>
    </Container>
  );
};
