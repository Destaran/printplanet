import styled from "styled-components";
import { getImageUrlById } from "../../../../../utils/helperFunctions";
import { Tooltip } from "react-tooltip";
import { FormInput } from "../../../FormInput/FormInput.component";
import { useMemo, useState } from "react";

const ppBlue = "#14213d";

const Container = styled.div`
  width: 110px;
  margin-right: 10px;
`;

const BeltsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 2px solid black;
  background-color: ${ppBlue};
  cursor: pointer;

  &:hover {
    background-color: orange;
  }

  &:active {
    background-color: ${ppBlue};
  }
`;

const BeltButton = styled.img`
  width: 24px;
  height: auto;
`;

const beltImages = {
  basic: getImageUrlById("transport-belt"),
  fast: getImageUrlById("fast-transport-belt"),
  express: getImageUrlById("express-transport-belt"),
};

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
        <Tooltip id="transport-belt" delayShow={"1500"} place="bottom">
          15 item/s
        </Tooltip>
        <ButtonContainer data-tooltip-id="transport-belt">
          <BeltButton
            src={beltImages.basic}
            data-value={15}
            onClick={handleClick}
          />
        </ButtonContainer>
        <Tooltip id="fast-transport-belt" delayShow={"1500"} place="bottom">
          30 item/s
        </Tooltip>
        <ButtonContainer data-tooltip-id="fast-transport-belt">
          <BeltButton
            src={beltImages.fast}
            data-value={30}
            onClick={handleClick}
          />
        </ButtonContainer>
        <Tooltip id="express-transport-belt" delayShow={"1500"} place="bottom">
          45 item/s
        </Tooltip>
        <ButtonContainer data-tooltip-id="express-transport-belt">
          <BeltButton
            src={beltImages.express}
            data-value={45}
            onClick={handleClick}
          />
        </ButtonContainer>
      </BeltsContainer>
    </Container>
  );
};
