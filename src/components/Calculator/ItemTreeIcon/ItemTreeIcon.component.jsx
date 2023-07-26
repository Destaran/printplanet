import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./ItemTreeIcon.styles";
import {
  formatNumber,
  getImageUrlById,
  getRecipes,
  checkIfUseableModule,
} from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  extendElement,
  extendSameTypeElements,
  collapseElement,
  collapseSameTypeElements,
  bumpModules,
} from "../../../reduxStore/calculator/calculator.slice";
import { RecipeSelectPopup } from "../RecipeSelectPopup/RecipeSelectPopup.component";
import { useEffect } from "react";
import { useCallback } from "react";

// refactor
export const ItemTreeIcon = ({ outputItem }) => {
  const { uid, id, amount, ingredients, machine, recipe } = outputItem;
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const imgUrl = getImageUrlById(id);
  const showAmount = formatNumber(amount);

  const checkMachine = useCallback(() => {
    if (uid && machine) {
      const { modules } = machine;
      let shouldBump = false;
      modules.forEach((module) => {
        if (
          module.includes("productivity") &&
          !checkIfUseableModule(module, recipe)
        ) {
          shouldBump = true;
        }
      });
      if (shouldBump === true) {
        dispatch(bumpModules(uid));
      }
    }
  }, [dispatch, machine, recipe, uid]);

  useEffect(() => {
    checkMachine();
  }, [checkMachine, dispatch, machine, recipe, uid]);

  const handleClick = (event) => {
    const recipe = getRecipes(id);
    if (!ingredients) {
      if (recipe.length > 1) {
        setShowPopup(true);
      } else {
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
      <OutterElementContainer onClick={handleClick}>
        <InnerElementContainer>
          <ImgContainer>
            <img src={imgUrl} />
            {showAmount && <p>{showAmount}</p>}
          </ImgContainer>
        </InnerElementContainer>
      </OutterElementContainer>
      {showPopup && (
        <RecipeSelectPopup inputId={id} uid={uid} setShowPopup={setShowPopup} />
      )}
    </>
  );
};
