import styled from "styled-components";
import {
  checkIfMultipleRecipes,
  formatNumber,
  getImageUrlById,
  getRecipeByProduct,
} from "../../../../../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  extendElement,
  extendSameTypeElements,
  collapseElement,
  collapseSameTypeElements,
} from "../../../../../../../reduxStore/calculator/calculator.slice";
import { SelectRecipePopup } from "../../../../../SelectRecipePopup/SelectRecipePopup.component";

const Container = styled.div`
  border: 2px solid #b47500;
  height: 36px;
  width: 36px;
  padding: 2px;
  margin: 1px;
  background-color: #313131;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: orange;
  }
  &:active {
    background-color: #313131;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  object-fit: contain;
  img {
    height: 100%;
    width: auto;
  }
`;

const AmountText = styled.p`
  position: absolute;
  font-size: ${({ lengthExceedsLimit }) =>
    lengthExceedsLimit ? "12px" : "16px"};
  height: 16px;
  bottom: 0;
  right: 0;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
`;

export const ProductIcon = ({ outputItem }) => {
  const { uid, id, amount, ingredients } = outputItem;
  const [popupId, setPopupId] = useState(null);
  const dispatch = useDispatch();
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);
  const lengthExceedsLimit = JSON.stringify(displayAmount).length > 5;

  const handleClick = (event) => {
    if (!ingredients) {
      if (checkIfMultipleRecipes(id)) {
        document.activeElement.blur();
        setPopupId(id);
      } else {
        const recipe = getRecipeByProduct(id);
        if (event.shiftKey && event.button === 0) {
          const payload = {
            id: id,
            recipe: recipe.name,
          };
          dispatch(extendSameTypeElements(payload));
        } else {
          const payload = {
            uid: uid,
            recipe: recipe.name,
          };
          dispatch(extendElement(payload));
        }
      }
    } else {
      if (event.shiftKey && event.button === 0) {
        dispatch(collapseSameTypeElements(id));
      } else {
        dispatch(collapseElement(uid));
      }
    }
  };

  return (
    <>
      <Container onClick={handleClick}>
        <InnerContainer>
          <ImgContainer>
            <img src={imgUrl} />
            {displayAmount && (
              <AmountText lengthExceedsLimit={lengthExceedsLimit}>
                {displayAmount}
              </AmountText>
            )}
          </ImgContainer>
        </InnerContainer>
      </Container>
      {popupId && (
        <SelectRecipePopup id={popupId} setId={setPopupId} uid={uid} />
      )}
    </>
  );
};
