import { FormInput } from "../FormInput/FormInput.component";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { Tooltip } from "react-tooltip";

import {
  QuantitySelectContainer,
  BeltsContainer,
  BeltContainer,
  BeltButton,
} from "./QuantitySelect.styles";

const beltImages = [
  getImageUrlById("transport-belt"),
  getImageUrlById("fast-transport-belt"),
  getImageUrlById("express-transport-belt"),
];

export const QuantitySelect = ({ setQuantity, quantity }) => {
  const handleQuantityChange = ({ target }) => {
    const { value } = target;
    setQuantity(value);
  };

  const handleBeltIconClick = ({ target }) => {
    const value = target.getAttribute("data-value");
    setQuantity(value);
  };

  return (
    <QuantitySelectContainer>
      <FormInput
        placeholder="Quantity"
        type="number"
        value={quantity}
        name="quantity"
        onChange={handleQuantityChange}
      />
      <BeltsContainer>
        <Tooltip id="transport-belt" delayShow={"1500"} place="bottom">
          15 item/s
        </Tooltip>
        <BeltContainer data-tooltip-id="transport-belt">
          <BeltButton
            src={beltImages[0]}
            data-value={15}
            onClick={handleBeltIconClick}
          />
        </BeltContainer>
        <Tooltip id="fast-transport-belt" delayShow={"1500"} place="bottom">
          30 item/s
        </Tooltip>
        <BeltContainer data-tooltip-id="fast-transport-belt">
          <BeltButton
            src={beltImages[1]}
            data-value={30}
            onClick={handleBeltIconClick}
          />
        </BeltContainer>
        <Tooltip id="express-transport-belt" delayShow={"1500"} place="bottom">
          45 item/s
        </Tooltip>
        <BeltContainer data-tooltip-id="express-transport-belt">
          <BeltButton
            src={beltImages[2]}
            data-value={45}
            onClick={handleBeltIconClick}
          />
        </BeltContainer>
      </BeltsContainer>
    </QuantitySelectContainer>
  );
};
