import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOutput } from "../../../redux/calculator/calculator.slice";
import { outputKeys } from "../../../redux/calculator/calculator.selector";
import { Options } from "./Options/Options.component";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: start;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid black;
`;

export const ItemSelect = () => {
  const dispatch = useDispatch();
  const output = useSelector(outputKeys);
  const [searchString, setSearchString] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const resetHandler = () => {
    setSearchString("");
    setCurrentItem("");
    setQuantity(1);
    if (output.length > 0) {
      dispatch(resetOutput({}));
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
    </Container>
  );
};
