import styled from "styled-components";
import { getImageUrlById } from "../../../../../utils/helperFunctions";
import { FormInput } from "../../../../FormInput";
import { useMemo, useState } from "react";

const Container = styled.div`
  width: 110px;
  margin-right: 10px;
`;

const BeltsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
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

const BeltIndicator = styled.p`
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
// refactor
export const QuantitySelect = ({ setQuantity, quantity }) => {
  const [beltPerSec, setBeltPerSec] = useState(0);

  useMemo(() => {
    if (quantity % beltPerSec !== 0) {
      setBeltPerSec(0);
    }
  }, [beltPerSec, quantity]);

  const onQuantityChange = ({ target }) => {
    const { value } = target;
    setQuantity(value);
  };

  const handleClick = ({ target }) => {
    const value = target.getAttribute("data-value");
    if (value !== beltPerSec) {
      setBeltPerSec(value);
    }
    if (beltPerSec === value) {
      setQuantity(Number(quantity) + Number(value));
    } else {
      setQuantity(value);
    }
  };

  const handleInputFocus = ({ target }) => {
    target.select();
  };

  return (
    <Container>
      <FormInput
        placeholder="Quantity"
        type="number"
        value={quantity}
        name="quantity"
        onChange={onQuantityChange}
        onFocus={handleInputFocus}
      />
      <BeltsContainer>
        <ButtonContainer onClick={handleClick} data-value={15}>
          <img src={beltImages.basic} data-value={15} />
          {beltPerSec > 0 && beltPerSec < 16 && (
            <BeltIndicator>{quantity / beltPerSec}</BeltIndicator>
          )}
        </ButtonContainer>
        <ButtonContainer onClick={handleClick} data-value={30}>
          <img src={beltImages.fast} data-value={30} />
          {beltPerSec > 15 && beltPerSec < 31 && (
            <BeltIndicator>{quantity / beltPerSec}</BeltIndicator>
          )}
        </ButtonContainer>
        <ButtonContainer onClick={handleClick} data-value={45}>
          <img src={beltImages.express} data-value={45} />
          {beltPerSec > 30 && (
            <BeltIndicator>{quantity / beltPerSec}</BeltIndicator>
          )}
        </ButtonContainer>
      </BeltsContainer>
    </Container>
  );
};
