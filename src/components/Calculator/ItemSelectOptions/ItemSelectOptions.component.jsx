import {
  SelectionContainer,
  UnitSelectContainer,
  AddButtonContainer,
} from "./ItemSelectOptions.styles";
import { getRecipes, getNameById } from "../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToOutput,
  addToExistingOutput,
} from "../../../reduxStore/calculator/calculator.slice";
import { outputKeys } from "../../../reduxStore/calculator/calculator.selector";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup.component.jsx";
import { SearchBar } from "../SearchBar/SearchBar.component";
import { QuantitySelect } from "../QuantitySelect/QuantitySelect.component";
import { FormSelect } from "../FormSelect/FormSelect.component";
import { Button } from "../../Button/Button.component";

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
  const [recipes, setRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
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
    setRecipes([]);
  }, [setCurrentItem, setQuantity, setSearchString]);

  const addItemHandler = useCallback(() => {
    if (currentItem) {
      const existingItem = output.find((item) => item === currentItem);
      if (!existingItem) {
        const recipe = getRecipes(currentItem);
        if (recipe.length > 1) {
          setRecipes(recipe);
          setShowPopup(true);
        } else if (recipe) {
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
        addItemHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addItemHandler]);

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
          <Button onClick={addItemHandler}>[A]dd</Button>
        </AddButtonContainer>
      </UnitSelectContainer>
      {showPopup && (
        <SelectRecipePopup
          currentItem={currentItem}
          quantity={quantity}
          recipes={recipes}
          setShowPopup={setShowPopup}
          resetOptions={resetOptions}
        />
      )}
    </SelectionContainer>
  );
};
