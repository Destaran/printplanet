import {
  SelectionContainer,
  UnitSelectContainer,
  AddButtonContainer,
} from "./ItemSelectOptions.styles";
import {
  getNameById,
  checkIfMultipleRecipes,
  getRecipeById,
} from "../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToOutput,
  addToExistingOutput,
} from "../../../reduxStore/calculator/calculator.slice";
import { outputKeys } from "../../../reduxStore/calculator/calculator.selector";
import { SearchBar } from "../SearchBar/SearchBar.component";
import { QuantitySelect } from "../QuantitySelect/QuantitySelect.component";
import { FormSelect } from "../FormSelect/FormSelect.component";
import { Button } from "../../Button/Button.component";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup.component";

// refactor
export const ItemSelectOptions = ({
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
      if (event.key === "A") {
        addHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addHandler]);

  const addInfo = {
    quantity,
    resetItemSelect: resetOptions,
  };

  return (
    <SelectionContainer>
      <SearchBar
        selectItem={selectItem}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      <UnitSelectContainer>
        <FormSelect value={unit} onChange={handleUnitChange} />
        <AddButtonContainer>
          <Button onClick={addHandler}>[A]dd</Button>
        </AddButtonContainer>
      </UnitSelectContainer>
      {popupId && (
        <SelectRecipePopup id={popupId} setId={setPopupId} addInfo={addInfo} />
      )}
    </SelectionContainer>
  );
};
