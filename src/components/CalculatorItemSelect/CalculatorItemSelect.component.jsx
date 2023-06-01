import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOutput } from "../../reduxStore/calculator/calculator.selector";
import { resetOutput } from "../../reduxStore/calculator/calculator.slice";

import CalculatorItemSelectOptions from "../CalculatorItemSelectOptions/CalculatorItemSelectOptions.component";
import CalculatorMenus from "../CalculatorMenus/CalculatorMenus.component";

import {
  CalculatorItemSelectContainer,
  MachinesContainer,
  OptionsContainer,
} from "./CalculatorItemSelect.styles";

const CalculatorItemSelect = () => {
  const dispatch = useDispatch();
  const output = useSelector(selectOutput);
  const [searchString, setSearchString] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [quantity, setQuantity] = useState(1);

  const resetHandler = () => {
    setSearchString("");
    setCurrentItem({});
    setQuantity(1);
    if (output.length > 0) {
      dispatch(resetOutput());
    }
  };

  return (
    <CalculatorItemSelectContainer>
      <CalculatorItemSelectOptions
        searchString={searchString}
        setSearchString={setSearchString}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <MachinesContainer></MachinesContainer>
      <OptionsContainer></OptionsContainer>
      <CalculatorMenus resetHandler={resetHandler} />
    </CalculatorItemSelectContainer>
  );
};

export default CalculatorItemSelect;
