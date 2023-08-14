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
import { Popup } from "../../Popup/Popup.component";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #313131;
  margin: 4px;
  padding: 2px;
  height: 40px;
  width: 40px;
  border: 1px black solid;
  img {
    margin: 0;
    height: 36px;
    width: 36px;
  }
`;

const AmountText = styled.p`
  position: absolute;
  font-size: 18px;
  bottom: 0px;
  right: 0px;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
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
    <Popup title={"Modify / Remove Output Item"}>
      <InputContainer>
        <ArrowContainer onClick={prevHandler}>
          <FiArrowLeft />
          <ArrowBind>[A]</ArrowBind>
        </ArrowContainer>
        <ImageContainer>
          <img src={imgUrl} alt={id} />
          <AmountText>{amount}</AmountText>
        </ImageContainer>
        <input
          ref={inputRef}
          type="number"
          min={1}
          autoFocus
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
          <u>E</u>nter
        </Button>
        <Button onClick={removeHandler} buttonType={"red"}>
          <u>R</u>emove
        </Button>
        <Button onClick={backHandler}>
          <u>B</u>ack
        </Button>
      </ButtonsContainer>
    </Popup>
  );
};
