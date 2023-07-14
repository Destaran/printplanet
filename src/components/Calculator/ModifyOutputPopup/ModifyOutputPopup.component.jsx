import {
  CalculatorSummaryElementPopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
} from "./ModifyOutputPopup.styles";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromOutput,
  modifyOutputElement,
} from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";
import { outputObject } from "../../../reduxStore/calculator/calculator.selector";

export const ModifyOutputPopup = ({ outputId: id, setOutputId }) => {
  const amount = useSelector(outputObject)[id].amount;
  const [newAmount, setNewAmount] = useState(amount);
  const imgUrl = getImageUrlById(id);
  const dispatch = useDispatch();

  const inputHandler = ({ target }) => {
    setNewAmount(target.value);
  };

  const modifyHandler = () => {
    const newItem = {
      id: id,
      amount: Number(newAmount),
    };
    dispatch(modifyOutputElement(newItem));
    setOutputId(null);
  };

  const removeHandler = () => {
    dispatch(removeFromOutput(id));
    setOutputId(null);
  };

  const cancelHandler = () => {
    setOutputId(null);
  };

  return (
    <CalculatorSummaryElementPopupContainer>
      <InnerContainer>
        <Header>
          <p>Modify / Remove Item</p>
        </Header>
        <InputContainer>
          <img src={imgUrl} alt={id} />
          <input
            type="number"
            autoFocus
            value={newAmount}
            onChange={inputHandler}
          />
        </InputContainer>
        <ButtonsContainer>
          <Button onClick={modifyHandler} buttonType={"green"}>
            Modify
          </Button>
          <Button onClick={removeHandler} buttonType={"red"}>
            Remove
          </Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </ButtonsContainer>
      </InnerContainer>
    </CalculatorSummaryElementPopupContainer>
  );
};
