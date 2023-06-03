import { ItemTreeListElement } from "../ItemTreeListElement/ItemTreeListElement.component";
import { ItemTreeList } from "../ItemTreeList/ItemTreeList.component";
import { ItemTreeListSpan } from "../ItemTreeListSpan/ItemTreeListSpan.component";

import { rrbi } from "../../../utils/helperFunctions";
import { useDispatch } from "react-redux";
import {
  extendElement,
  collapseElement,
} from "../../../reduxStore/calculator/calculator.slice";

export const ItemTreeFragment = ({ outputItem, pid }) => {
  const { id, extend } = outputItem;
  const recipe = rrbi(id);
  // const ingredients = recipe.ingredients;
  // const expandable = recipe.ingredients.length;
  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.shiftKey && event.button === 0) {
      // Additional logic for Shift+Left Click
      console.log("Shift+Left Click detected!");
    }
    console.log("extend element");
  };

  return (
    <>
      <ItemTreeListSpan outputItem={outputItem} handleClick={handleClick} />
      {/* {extend && <ItemTreeList ingredients={ingredients} pid={pid} />} */}
    </>
  );
};
