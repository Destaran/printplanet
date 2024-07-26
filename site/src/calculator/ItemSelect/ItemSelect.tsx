import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { outputKeys } from "redux/calculator/calculator.selector";
import {
  addToOutput,
  addToExistingOutput,
} from "redux/calculator/calculator.slice";
import {
  checkIfMultipleRecipes,
  getRecipeById,
  getNameById,
} from "utils/helperFunctions";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup";
import { QuantitySelect } from "./QuantitySelect";
import { Selection } from "./Selection";
import { UnitSelection } from "./UnitSelection";

const Container = styled.div`
  display: flex;
  justify-content: start;
`;

export function ItemSelect() {
  const dispatch = useDispatch();
  const output = useSelector(outputKeys);

  const [searchString, setSearchString] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [popupId, setPopupId] = useState<null | string>(null);
  const [unit, setUnit] = useState<number>(1);

  function handleUnitChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    setUnit(Number(value));
  }

  const reset = useCallback(() => {
    setSearchString("");
    setCurrentItem("");
    setQuantity(1);
    setUnit(1);
  }, [setCurrentItem, setQuantity, setSearchString]);

  const addHandler = useCallback(() => {
    if (!currentItem) {
      return;
    }

    const recipe = getRecipeById(currentItem);
    const existingItem = output.find((item) => item === currentItem);
    const itemToAdd = {
      id: currentItem,
      amount: Number(quantity),
      recipe: recipe.name,
    };

    if (existingItem) {
      dispatch(addToExistingOutput(itemToAdd));
      reset();
      return;
    }

    if (!checkIfMultipleRecipes(currentItem)) {
      dispatch(addToOutput(itemToAdd));
      reset();
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setPopupId(currentItem);
  }, [currentItem, dispatch, output, quantity, reset]);

  function selectItem(event: React.MouseEvent<HTMLLIElement>) {
    const target = event.target as HTMLLIElement;
    const id = target.id;
    const name = getNameById(id);

    setCurrentItem(id);
    setSearchString(name);
  }

  return (
    <Container>
      <Selection
        selectItem={selectItem}
        currentItem={currentItem}
        searchString={searchString}
        setCurrentItem={setCurrentItem}
        setSearchString={setSearchString}
      />
      <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      <UnitSelection
        unit={unit}
        handleUnitChange={handleUnitChange}
        addHandler={addHandler}
      />
      {popupId && (
        <SelectRecipePopup
          id={popupId}
          setId={setPopupId}
          addInfo={{
            quantity,
            resetItemSelect: reset,
          }}
          uid={undefined}
          selectMultiple={undefined}
          setSelectMultiple={undefined}
        />
      )}
    </Container>
  );
}
