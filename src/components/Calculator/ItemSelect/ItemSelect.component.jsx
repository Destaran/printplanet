import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOutput } from "../../../reduxStore/calculator/calculator.slice";
import { outputKeys } from "../../../reduxStore/calculator/calculator.selector";
import { Options } from "./Options/Options.component";
import { DefaultMachineConfig } from "../DefaultMachineConfig/DefaultMachineConfig.component";
import { Menus } from "../Menus/Menus.component";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: start;
  height: 112px;
  margin-bottom: 20px;
  input,
  select {
    border-radius: 0px;
  }
`;

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
    <Container>
      <Options
        searchString={searchString}
        setSearchString={setSearchString}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <DefaultMachineConfig />
      <Menus resetHandler={resetHandler} />
    </Container>
  );
};
