import {
  CalculatorSummaryElementPopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
} from "./SummaryElementPopup.styles";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromOutput,
  modifyOutputElement,
} from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";

export const SummaryElementPopup = ({ object, setShowPopup }) => {
  const { id, amount } = object;
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
    setShowPopup(false);
    dispatch(modifyOutputElement(newItem));
  };

  const removeHandler = () => {
    setShowPopup(false);
    dispatch(removeFromOutput(id));
  };

  const cancelHandler = () => {
    setShowPopup(false);
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
