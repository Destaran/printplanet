import { FormInput } from "../FormInput/FormInput.component";
import { returnImageUrlById } from "../../../utils/helperFunctions";

import {
  QuantitySelectContainer,
  BeltsContainer,
  BeltContainer,
  BeltButton,
} from "./QuantitySelect.styles";

const beltImages = [
  returnImageUrlById("transport-belt"),
  returnImageUrlById("fast-transport-belt"),
  returnImageUrlById("express-transport-belt"),
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
        <BeltContainer>
          <BeltButton
            src={beltImages[0]}
            data-value={15}
            onClick={handleBeltIconClick}
          />
        </BeltContainer>
        <BeltContainer>
          <BeltButton
            src={beltImages[1]}
            data-value={30}
            onClick={handleBeltIconClick}
          />
        </BeltContainer>
        <BeltContainer>
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
