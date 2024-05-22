import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromOutput,
  modifyOutputElement,
} from "../../../redux/calculator/calculator.slice";
import {
  outputObject,
  outputKeys,
} from "../../../redux/calculator/calculator.selector";
import { Button } from "../../Button";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";
import { Popup } from "../../Popup";
import { useDisplayNumber } from "utils/useDisplayNumber";

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
  background-color: ${({ theme }) => theme.colors.grey};
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
interface Props {
  outputId: string;
  setOutputId: (id: string | null) => void;
}

export function ModifyOutputPopup({ outputId, setOutputId }: Props) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const outputArray = useSelector(outputKeys);
  const [id, setId] = useState(outputId);
  const currentIdx = outputArray.indexOf(id);
  const imgUrl = getImageUrlById(id);
  const amount = useSelector(outputObject)[id].amount;
  const [newAmount, setNewAmount] = useState(amount);

  useEffect(() => {
    setNewAmount(amount);
  }, [amount]);

  function inputHandler({ target }: React.ChangeEvent<HTMLInputElement>) {
    setNewAmount(target.value);
  }

  const enterHandler = useCallback(() => {
    const div = document.activeElement as HTMLDivElement;
    div.blur();

    const item = {
      id: id,
      amount: Number(newAmount),
    };
    dispatch(modifyOutputElement(item));
  }, [dispatch, id, newAmount]);

  const removeHandler = useCallback(() => {
    let direction = currentIdx === outputArray.length - 1 ? -1 : 1;
    const newIndex = currentIdx + direction;
    newIndex < 0 ? setOutputId(null) : setId(outputArray[newIndex]);
    dispatch(removeFromOutput(id));
  }, [currentIdx, dispatch, id, outputArray, setOutputId]);

  const backHandler = useCallback(() => {
    setOutputId(null);
  }, [setOutputId]);

  const switchHandler = useCallback(
    (next: boolean) => {
      const div = document.activeElement as HTMLDivElement;
      div.blur();
      let direction = next ? 1 : -1;
      const idx =
        (currentIdx + direction + outputArray.length) % outputArray.length;
      setId(outputArray[idx]);
      if (inputRef.current) {
        const input = inputRef.current as HTMLInputElement;
        input.focus();
        input.select();
      }
    },
    [currentIdx, outputArray]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
        switchHandler(false);
      }
      if (event.key === "d") {
        switchHandler(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backHandler, enterHandler, switchHandler, removeHandler]);

  return (
    <Popup title={"Modify Output"}>
      <InputContainer>
        <ArrowContainer onClick={() => switchHandler(false)}>
          <FiArrowLeft />
          <ArrowBind>A</ArrowBind>
        </ArrowContainer>
        <ImageContainer>
          <img src={imgUrl} alt={id} />
          <AmountText>{useDisplayNumber(amount)}</AmountText>
        </ImageContainer>
        <input
          ref={inputRef}
          type="number"
          min={1}
          autoFocus
          onChange={inputHandler}
        />
        <ArrowContainer onClick={() => switchHandler(true)}>
          <FiArrowRight />
          <ArrowBind>D</ArrowBind>
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
}
