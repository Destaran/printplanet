import styled from "styled-components";
import { getRecipes } from "../../utils/helperFunctions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToOutput,
  extendElement,
  extendSameTypeElements,
} from "../../redux/calculator/calculator.slice";
import { SelectButton } from "./SelectButton";
import { Button } from "../../components/Button";
import { useCallback } from "react";
import { Popup } from "../../components/Popup";

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

interface Props {
  id: string;
  setId: (id: string | null) => void;
  uid?: string | null;
  addInfo?: { quantity: number; resetItemSelect: () => void };
  selectMultiple?: boolean;
  setSelectMultiple?: (bool: boolean) => void;
}

export function SelectRecipePopup({
  id,
  setId,
  uid,
  addInfo,
  selectMultiple,
  setSelectMultiple,
}: Props) {
  const dispatch = useDispatch();
  const recipes = getRecipes(id);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [warning, setWarning] = useState(false);

  const resetComponent = useCallback(() => {
    setId(null);
    setWarning(false);
    setSelectedRecipe("");

    if (setSelectMultiple) {
      setSelectMultiple(false);
    }
  }, [setId, setSelectMultiple]);

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
    } else if ((selectedRecipe && selectMultiple) || !uid) {
      const payload = {
        id,
        recipe: selectedRecipe,
      };
      dispatch(extendSameTypeElements(payload));
      resetComponent();
    } else if (selectedRecipe && !selectMultiple) {
      const payload = {
        uid,
        recipe: selectedRecipe,
      };
      dispatch(extendElement(payload));
      resetComponent();
    } else {
      setWarning(true);
    }
  }, [
    addInfo,
    dispatch,
    id,
    resetComponent,
    selectMultiple,
    selectedRecipe,
    uid,
  ]);

  const handleBack = useCallback(() => {
    resetComponent();
  }, [resetComponent]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    <Popup title={"Select Recipe"}>
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
          <u>E</u>nter
        </Button>
        <Button onClick={handleBack} buttonType={"red"}>
          <u>B</u>ack
        </Button>
      </ButtonsContainer>
    </Popup>
  );
}
