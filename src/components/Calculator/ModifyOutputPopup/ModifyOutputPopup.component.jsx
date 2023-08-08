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
    transform: scale(2);
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

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 37px;
  width: 37px;
  margin: 0 5px 0 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    transition: all 0.1s;
    color: orange;
    transform: scale(0.9);
  }

  p {
    margin: 0;
  }
`;

const ArrowBind = styled.p`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 12px;
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
    const currentIndex = outputArray.indexOf(id);
    let direction = 1;
    if (currentIndex === outputArray.length - 1) {
      direction = -1;
    }
    const newIndex = currentIndex + direction;
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
          <ArrowContainer onClick={prevHandler}>
            <FiArrowLeft />
            <ArrowBind>[A]</ArrowBind>
          </ArrowContainer>
          <img src={imgUrl} alt={id} />
          <input
            ref={inputRef}
            type="number"
            autoFocus
            value={newAmount}
            onChange={inputHandler}
            onFocus={handleInputFocus}
          />
          <ArrowContainer onClick={nextHandler}>
            <FiArrowRight />
            <ArrowBind>[D]</ArrowBind>
          </ArrowContainer>
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
