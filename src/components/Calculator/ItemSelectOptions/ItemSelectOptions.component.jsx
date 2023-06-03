import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToOutput } from "../../../reduxStore/calculator/calculator.slice";
import {
  checkIfMultipleRecipes,
  returnNameById,
} from "../../../utils/helperFunctions";
import { Button } from "../../Button/Button.component";
import { SearchBar } from "../SearchBar/SearchBar.component";
import { QuantitySelect } from "../QuantitySelect/QuantitySelect.component";
import { FormSelect } from "../FormSelect/FormSelect.component";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup.component.jsx";
import {
  SelectionContainer,
  UnitSelectContainer,
  AddButtonContainer,
} from "./ItemSelectOptions.styles";

export const ItemSelectOptions = ({
  searchString,
  setSearchString,
  currentItem,
  setCurrentItem,
  quantity,
  setQuantity,
}) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [unit, setUnit] = useState(1);

  const handleUnitChange = ({ target }) => {
    const { value } = target;
    setUnit(value);
  };

  const resetOptions = () => {
    setSearchString("");
    setCurrentItem("");
    setQuantity(1);
    setUnit(1);
    setRecipes([]);
  };

  const addItemHandler = () => {
    const recipe = checkIfMultipleRecipes(currentItem);
    if (recipe.length > 1) {
      setRecipes(recipe);
      setShowPopup(true);
    } else if (recipe) {
      const itemToAdd = {
        id: currentItem,
        amount: Number(quantity),
        recipe: recipe,
      };
      dispatch(addToOutput(itemToAdd));
      resetOptions();
    }
  };

  const selectItem = ({ target }) => {
    const selectedItem = target.id;
    setSearchString(returnNameById(selectedItem));
    setCurrentItem(selectedItem);
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
          <Button onClick={addItemHandler}>Add</Button>
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
