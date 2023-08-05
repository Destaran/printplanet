import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
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
  console.log(id);

  const inputHandler = ({ target }) => {
    setNewAmount(target.value);
  };

  const enterHandler = useCallback(() => {
    const newItem = {
      id: id,
      amount: Number(newAmount),
    };
    dispatch(modifyOutputElement(newItem));
    setOutputId(null);
  }, [dispatch, id, newAmount, setOutputId]);

  const removeHandler = useCallback(() => {
    dispatch(removeFromOutput(id));
    setOutputId(null);
  }, [dispatch, id, setOutputId]);

  const backHandler = useCallback(() => {
    setOutputId(null);
  }, [setOutputId]);

  const handleInputFocus = ({ target }) => {
    target.select();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "r") {
        removeHandler();
      }
      if (event.key.toLowerCase() === "e") {
        enterHandler();
      }
      if (event.key.toLowerCase() === "b") {
        backHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backHandler, enterHandler, removeHandler]);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <p>Modify / Remove Output Item</p>
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
          <Button onClick={enterHandler} buttonType={"green"}>
            [E]nter
          </Button>
          <Button onClick={removeHandler} buttonType={"red"}>
            [R]emove
          </Button>
          <Button onClick={backHandler}>[B]ack</Button>
        </ButtonsContainer>
      </InnerContainer>
    </Container>
  );
};
