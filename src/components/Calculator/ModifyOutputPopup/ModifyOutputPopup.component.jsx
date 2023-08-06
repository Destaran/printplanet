import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromOutput,
  modifyOutputElement,
} from "../../../reduxStore/calculator/calculator.slice";
import {
  outputObject,
  outputKeys,
} from "../../../reduxStore/calculator/calculator.selector";
import { Button } from "../../Button/Button.component";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

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
  svg {
    margin-left: 15px;
    margin-right: 15px;
    transform: scale(2);
    cursor: pointer;
    &:hover {
      color: orange;
    }
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

// refactor
export const ModifyOutputPopup = ({ outputId, setOutputId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const outputArray = useSelector(outputKeys);
  const [id, setId] = useState(outputId);
  const imgUrl = getImageUrlById(id);
  const amount = useSelector(outputObject)[id].amount;
  const [newAmount, setNewAmount] = useState(amount);

  useEffect(() => {
    setNewAmount(amount);
  }, [amount]);

  const inputHandler = ({ target }) => {
    setNewAmount(target.value);
  };

  const enterHandler = useCallback(() => {
    document.activeElement.blur();
    const newItem = {
      id: id,
      amount: Number(newAmount),
    };
    dispatch(modifyOutputElement(newItem));
  }, [dispatch, id, newAmount]);

  const removeHandler = useCallback(() => {
    let direction = -1;
    if (outputArray.indexOf(id) === 0) {
      direction = 1;
    }
    const newIndex = outputArray.indexOf(id) + direction;
    if (newIndex < 0) {
      setOutputId(null);
    } else {
      setId(outputArray[newIndex]);
    }
    dispatch(removeFromOutput(id));
  }, [dispatch, id, outputArray, setOutputId]);

  const backHandler = useCallback(() => {
    setOutputId(null);
  }, [setOutputId]);

  const handleInputFocus = ({ target }) => {
    target.select();
  };

  const nextHandler = useCallback(() => {
    document.activeElement.blur();
    const nextIndex = outputArray.indexOf(id) + 1;
    if (nextIndex < outputArray.length) {
      setId(outputArray[nextIndex]);
    }
    inputRef.current.focus();
    inputRef.current.select();
  }, [id, outputArray]);

  const prevHandler = useCallback(() => {
    document.activeElement.blur();
    const nextIndex = outputArray.indexOf(id) - 1;
    if (nextIndex >= 0) {
      setId(outputArray[nextIndex]);
    }
    inputRef.current.focus();
    inputRef.current.select();
  }, [id, outputArray]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r") {
        removeHandler();
      }
      if (event.key === "e") {
        enterHandler();
      }
      if (event.key === "b") {
        backHandler();
      }
      if (event.key === "a") {
        prevHandler();
      }
      if (event.key === "d") {
        nextHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backHandler, enterHandler, nextHandler, prevHandler, removeHandler]);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <p>Modify / Remove Output Item</p>
        </Header>
        <InputContainer>
          <FiArrowLeft onClick={prevHandler} />
          <img src={imgUrl} alt={id} />
          <input
            ref={inputRef}
            type="number"
            autoFocus
            value={newAmount}
            onChange={inputHandler}
            onFocus={handleInputFocus}
          />
          <FiArrowRight onClick={nextHandler} />
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
