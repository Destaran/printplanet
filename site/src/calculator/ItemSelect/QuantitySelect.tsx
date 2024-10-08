import styled from "styled-components";
import { getImageUrlById } from "../../utils/helperFunctions";
import { FormInput } from "../../components/FormInput";
import React, { useMemo, useState } from "react";

const Container = styled.div`
  width: 110px;
  margin-right: 10px;
`;

const BeltsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 2px solid black;
  background-color: ${({ theme }) => theme.colors.blue};
  transition: all 1s;
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    background-color: orange;
  }
  &:active {
    transition: all 0.1s;
    background-color: ${({ theme }) => theme.colors.blue};
    img {
      transform: scale(0.9);
    }
  }

  img {
    width: 24px;
    height: auto;
  }
`;

const Indicator = styled.p`
  position: absolute;
  font-size: 16px;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
  pointer-events: none;
`;

const beltImages = {
  basic: getImageUrlById("transport-belt"),
  fast: getImageUrlById("fast-transport-belt"),
  express: getImageUrlById("express-transport-belt"),
};

interface Props {
  setQuantity: (value: number) => void;
  quantity: number;
}

export function QuantitySelect({ setQuantity, quantity }: Props) {
  const [beltPerSec, setBeltPerSec] = useState(0);
  const quantityString = quantity.toString();

  useMemo(() => {
    if (quantity % beltPerSec !== 0) {
      setBeltPerSec(0);
    }
  }, [beltPerSec, quantity]);

  function onQuantityChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    setQuantity(Number(value));
  }

  function handleClick(value: number) {
    if (value !== beltPerSec) {
      setBeltPerSec(value);
    }
    if (beltPerSec === value) {
      setQuantity(Number(quantity) + Number(value));
    } else {
      setQuantity(value);
    }
  }

  return (
    <Container>
      <FormInput
        type="number"
        value={quantityString}
        name="quantity"
        onChange={onQuantityChange}
      />
      <BeltsWrapper>
        <Button onClick={() => handleClick(15)}>
          <img src={beltImages.basic} />
          {beltPerSec > 0 && beltPerSec < 16 && (
            <Indicator>{quantity / beltPerSec}</Indicator>
          )}
        </Button>
        <Button onClick={() => handleClick(30)}>
          <img src={beltImages.fast} />
          {beltPerSec > 15 && beltPerSec < 31 && (
            <Indicator>{quantity / beltPerSec}</Indicator>
          )}
        </Button>
        <Button onClick={() => handleClick(45)}>
          <img src={beltImages.express} />
          {beltPerSec > 30 && <Indicator>{quantity / beltPerSec}</Indicator>}
        </Button>
      </BeltsWrapper>
    </Container>
  );
}
