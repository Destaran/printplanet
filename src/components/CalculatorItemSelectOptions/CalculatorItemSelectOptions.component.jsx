import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToOutput } from "../../reduxStore/calculator/calculator.slice";
import { robi } from "../../utils/helperFunctions";
import SearchBar from "../CalculatorItemSelect/SubComponents/SearchBar/SearchBar.component";
import QuantitySelect from "../CalculatorItemSelect/SubComponents/QuantitySelect/QuantitySelect.component";
import CalculatorFormSelect from "../CalculatorFormSelect/CalculatorFormSelect.component";

import {
  SelectionContainer,
  UnitSelectContainer,
  AddButtonContainer,
} from "./CalculatorItemSelectOptions.styles";

const CalculatorItemSelectOptions = ({
  searchString,
  setSearchString,
  currentItem,
  setCurrentItem,
  quantity,
  setQuantity,
}) => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState(1);

  const handleUnitChange = ({ target }) => {
    const { value } = target;
    setUnit(value);
  };

  const addItemHandler = () => {
    const itemToAdd = {
      id: currentItem.id,
      amount: quantity,
    };
    dispatch(addToOutput(itemToAdd));
    setSearchString("");
    setCurrentItem({});
    setQuantity(1);
  };

  const selectItem = (event) => {
    const selectedItem = event.target.id;
    const selectedRecipe = robi(selectedItem);
    setSearchString(selectedRecipe.name);
    setCurrentItem(selectedRecipe);
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
        <CalculatorFormSelect value={unit} onChange={handleUnitChange} />
        <AddButtonContainer>
          <button onClick={addItemHandler}>Add</button>
        </AddButtonContainer>
      </UnitSelectContainer>
    </SelectionContainer>
  );
};

export default CalculatorItemSelectOptions;
