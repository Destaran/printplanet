import { ItemTreeList } from "../ItemTreeList/ItemTreeList.component";
import { ItemTreeListSpan } from "../ItemTreeListSpan/ItemTreeListSpan.component";

import { useState } from "react";
import { checkIfMultipleRecipes } from "../../../utils/helperFunctions";
import { useDispatch } from "react-redux";
import {
  extendElement,
  extendSameTypeElements,
  collapseElement,
  collapseSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import { ItemTreeExtendPopup } from "../ItemTreeExtendPopup/ItemTreeExtendPopup.component";

export const ItemTreeFragment = ({ outputItem, pid }) => {
  const { id, uid, ingredients } = outputItem;
  const [recipes, setRecipes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const recipe = checkIfMultipleRecipes(id);
    if (!ingredients && recipe) {
      if (recipe.length > 1) {
        setRecipes(recipe);
        setShowPopup(true);
      } else {
        if (event.shiftKey && event.button === 0) {
          const payload = {
            id: id,
            recipe: recipe,
          };
          dispatch(extendSameTypeElements(payload));
        } else {
          const payload = {
            pid: pid,
            uid: uid,
            recipe: recipe.name,
          };
          dispatch(extendElement(payload));
        }
      }
    } else if (ingredients) {
      if (event.shiftKey && event.button === 0) {
        dispatch(collapseSameTypeElements(id));
      } else {
        const payload = {
          pid: pid,
          uid: uid,
        };
        dispatch(collapseElement(payload));
      }
    }
  };

  return (
    <>
      {showPopup && (
        <ItemTreeExtendPopup
          setShowPopup={setShowPopup}
          recipes={recipes}
          uid={uid}
          pid={pid}
          noAfter={true}
        />
      )}
      <ItemTreeListSpan outputItem={outputItem} handleClick={handleClick} />
      {ingredients && <ItemTreeList ingredients={ingredients} pid={pid} />}
    </>
  );
};
