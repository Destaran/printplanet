import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { outputKeys } from "../../../reduxStore/calculator/calculator.selector";
import { resetOutput } from "../../../reduxStore/calculator/calculator.slice";

import { ItemSelectOptions } from "../ItemSelectOptions/ItemSelectOptions.component";
import { Menus } from "../Menus/Menus.component";

import {
  CalculatorItemSelectContainer,
  MachinesContainer,
  OptionsContainer,
} from "./ItemSelect.styles";

export const ItemSelect = () => {
  const dispatch = useDispatch();
  const output = useSelector(outputKeys);
  const [searchString, setSearchString] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const resetHandler = () => {
    setSearchString("");
    setCurrentItem("");
    setQuantity(1);
    if (output.length > 0) {
      dispatch(resetOutput());
    }
  };

  return (
    <CalculatorItemSelectContainer>
      <ItemSelectOptions
        searchString={searchString}
        setSearchString={setSearchString}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <MachinesContainer></MachinesContainer>
      <OptionsContainer></OptionsContainer>
      <Menus resetHandler={resetHandler} />
    </CalculatorItemSelectContainer>
  );
};
