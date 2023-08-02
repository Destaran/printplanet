import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromOutput,
  modifyOutputElement,
} from "../../../reduxStore/calculator/calculator.slice";
import { outputObject } from "../../../reduxStore/calculator/calculator.selector";
import { Button } from "../../Button/Button.component";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const InnerContainer = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 8px;
  width: 100%;
  max-width: 240px;
  background-color: white;
`;

const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    background-color: #313131;
    height: 36px;
    width: auto;
    padding: 4px;
    margin: 4px;
    border: 1px black solid;
  }
  input {
    height: 40px;
    font-size: 24px;
    width: 80px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 8px;
  }
`;

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

  const handleInputFocus = ({ target }) => {
    target.select();
  };

  return (
    <Container>
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
            onFocus={handleInputFocus}
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
    </Container>
  );
};
