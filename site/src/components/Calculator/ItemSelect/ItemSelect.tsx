import React, { useCallback, useEffect, useState } from "react";
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
import { SearchBar } from "./SearchBar";
import { UnitSelection } from "./UnitSelection";

const Container = styled.div`
  display: flex;
  justify-content: start;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export function ItemSelect() {
  const [searchString, setSearchString] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const output = useSelector(outputKeys);
  const [popupId, setPopupId] = useState<null | string>(null);
  const [unit, setUnit] = useState(1);

  const handleUnitChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUnit(Number(value));
  };

  const resetOptions = useCallback(() => {
    setSearchString("");
    setCurrentItem("");
    setQuantity(1);
    setUnit(1);
  }, [setCurrentItem, setQuantity, setSearchString]);

  const addHandler = useCallback(() => {
    if (currentItem) {
      const existingItem = output.find((item) => item === currentItem);
      if (!existingItem) {
        if (checkIfMultipleRecipes(currentItem) && document.activeElement) {
          (document.activeElement as HTMLElement).blur();
          setPopupId(currentItem);
        } else {
          const recipe = getRecipeById(currentItem);
          const itemToAdd = {
            id: currentItem,
            amount: Number(quantity),
            recipe: recipe.name,
          };
          dispatch(addToOutput(itemToAdd));
          resetOptions();
        }
      } else {
        const itemToAdd = {
          id: currentItem,
          amount: Number(quantity),
        };
        dispatch(addToExistingOutput(itemToAdd));
        resetOptions();
      }
    }
  }, [currentItem, dispatch, output, quantity, resetOptions]);

  const selectItem = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const selectedItem = target.id;
    setSearchString(getNameById(selectedItem));
    setCurrentItem(selectedItem);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "a" && currentItem) {
        addHandler();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addHandler, currentItem]);

  return (
    <Container>
      <SearchBar
        selectItem={selectItem}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        searchString={searchString}
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
            resetItemSelect: resetOptions,
          }}
          uid={undefined}
          selectMultiple={undefined}
          setSelectMultiple={undefined}
        />
      )}
    </Container>
  );
}
