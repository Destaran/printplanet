import {
  getImageUrlById,
  formatNumber,
  checkIfMultipleRecipes,
  lookUpProducers,
} from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { outputValues } from "../../../reduxStore/calculator/calculator.selector";
import {
  extendSameTypeElements,
  collapseSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./SummaryInputElement.styles";
import { ItemTreeExtendPopup } from "../ItemTreeExtendPopup/ItemTreeExtendPopup.component";

export const SummaryInputElement = ({ object }) => {
  const { amount, id } = object;
  const [recipes, setRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const output = useSelector(outputValues);
  const dispatch = useDispatch();
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(amount);

  const handleClick = (event) => {
    const recipe = checkIfMultipleRecipes(id);
    if (event.shiftKey && event.button === 0) {
      const resultArray = [];
      output.forEach((element) => {
        lookUpProducers(resultArray, element, id);
      });
      if (resultArray.length > 1) {
        resultArray.forEach((id) => {
          dispatch(collapseSameTypeElements(id));
        });
      } else if (resultArray.length === 1) {
        dispatch(collapseSameTypeElements(resultArray[0]));
      }
    } else {
      if (recipe && recipe.length > 1) {
        setRecipes(recipe);
        setShowPopup(true);
      } else if (recipe) {
        const payload = {
          id: id,
          recipe: recipe,
        };
        dispatch(extendSameTypeElements(payload));
      }
    }
  };

  return (
    <>
      <OutterElementContainer onClick={handleClick}>
        <InnerElementContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <p>{displayAmount}</p>
          </ImgContainer>
        </InnerElementContainer>
      </OutterElementContainer>
      {showPopup && (
        <ItemTreeExtendPopup
          recipes={recipes}
          setShowPopup={setShowPopup}
          id={id}
        />
      )}
    </>
  );
};
