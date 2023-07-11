import {
  SelectRecipePopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
  Warning,
} from "./ItemTreeExtendPopup.styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { extendSameTypeElements } from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";
import { SelectRecipePopupButton } from "../SelectRecipePopupButton/SelectRecipePopupButton.component";

export const ItemTreeExtendPopup = ({ setShowPopup, recipes, id }) => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [didntSelect, setDidntSelect] = useState(false);
  const dispatch = useDispatch();

  const handleSelectRecipe = ({ target }) => {
    const { id } = target;
    setSelectedRecipe(id);
  };

  const handleSelect = () => {
    if (selectedRecipe) {
      const payload = {
        id: id,
        recipe: selectedRecipe,
      };
      dispatch(extendSameTypeElements(payload));
      setShowPopup(false);
      setDidntSelect(false);
      setSelectedRecipe({});
    } else {
      setDidntSelect(true);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
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
            <SelectRecipePopupButton
              onClick={handleSelectRecipe}
              selectedRecipe={selectedRecipe}
              recipe={recipe}
              key={idx}
            />
          ))}
        </InputContainer>
        {didntSelect && <Warning>Select a recipe to continue!</Warning>}
        <ButtonsContainer>
          <Button onClick={handleSelect} buttonType={"green"}>
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
