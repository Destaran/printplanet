import {
  SelectRecipePopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
  Warning,
} from "./RecipeSelectPopup.styles";
import { getRecipes } from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  extendElement,
  extendSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import { SelectButton } from "../SelectRecipePopup/SelectButton.component";
import { Button } from "../../Button/Button.component";

// refactor
export const RecipeSelectPopup = ({
  inputId: id,
  uid,
  setInputId,
  setShowPopup,
}) => {
  const recipes = getRecipes(id);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [didntSelect, setDidntSelect] = useState(false);
  const dispatch = useDispatch();

  const handleSelectRecipe = ({ target }) => {
    setSelectedRecipe(target.id);
  };

  const handleSubmit = () => {
    if (selectedRecipe && !uid) {
      const payload = {
        id: id,
        recipe: selectedRecipe,
      };
      dispatch(extendSameTypeElements(payload));
      setInputId(null);
      setDidntSelect(false);
      setSelectedRecipe("");
    } else if (selectedRecipe) {
      const payload = {
        uid: uid,
        recipe: selectedRecipe,
      };
      dispatch(extendElement(payload));
      setShowPopup(false);
      setDidntSelect(false);
      setSelectedRecipe("");
    } else {
      setDidntSelect(true);
    }
  };

  const handleCancel = () => {
    if (setInputId) {
      setInputId(null);
    } else {
      setShowPopup(false);
    }
    setSelectedRecipe({});
    setDidntSelect(false);
  };

  return (
    <SelectRecipePopupContainer>
      <InnerContainer>
        <Header>
          <p>Select Recipe</p>
        </Header>
        <InputContainer>
          {recipes.map((recipe, idx) => (
            <SelectButton
              onClick={handleSelectRecipe}
              selectedRecipe={selectedRecipe}
              recipe={recipe}
              key={idx}
            />
          ))}
        </InputContainer>
        {didntSelect && <Warning>Select a recipe to continue!</Warning>}
        <ButtonsContainer>
          <Button onClick={handleSubmit} buttonType={"green"}>
            Submit
          </Button>
          <Button onClick={handleCancel} buttonType={"red"}>
            Cancel
          </Button>
        </ButtonsContainer>
      </InnerContainer>
    </SelectRecipePopupContainer>
  );
};
