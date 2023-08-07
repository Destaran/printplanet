import styled from "styled-components";
import {
  getNameById,
  checkIfMultipleRecipes,
  getRecipeById,
} from "../../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToOutput,
  addToExistingOutput,
} from "../../../../reduxStore/calculator/calculator.slice";
import { outputKeys } from "../../../../reduxStore/calculator/calculator.selector";
import { SearchBar } from "./SearchBar/SearchBar.component";
import { QuantitySelect } from "./QuantitySelect/QuantitySelect.component";
import { SelectRecipePopup } from "../../SelectRecipePopup/SelectRecipePopup.component";
import { UnitSelection } from "./UnitSelection/UnitSelection.component";

const ppBlue = "#14213d";

const Container = styled.div`
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

export const Options = ({
  searchString,
  setSearchString,
  currentItem,
  setCurrentItem,
  quantity,
  setQuantity,
}) => {
  const dispatch = useDispatch();
  const output = useSelector(outputKeys);
  const [popupId, setPopupId] = useState(null);
  const [unit, setUnit] = useState(1);

  const handleUnitChange = ({ target }) => {
    const { value } = target;
    setUnit(value);
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
        if (checkIfMultipleRecipes(currentItem)) {
          document.activeElement.blur();
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

  const selectItem = ({ target }) => {
    const selectedItem = target.id;
    setSearchString(getNameById(selectedItem));
    setCurrentItem(selectedItem);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a" && currentItem) {
        addHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addHandler, currentItem]);

  const addInfo = {
    quantity,
    resetItemSelect: resetOptions,
  };

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
        <SelectRecipePopup id={popupId} setId={setPopupId} addInfo={addInfo} />
      )}
    </Container>
  );
};
