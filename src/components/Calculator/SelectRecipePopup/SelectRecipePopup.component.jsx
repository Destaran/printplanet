import {
  SelectRecipePopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
  Warning,
} from "./SelectRecipePopup.styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToOutput } from "../../../reduxStore/calculator/calculator.slice";
import { SelectRecipePopupButton } from "../SelectRecipePopupButton/SelectRecipePopupButton.component";
import { Button } from "../../Button/Button.component";

// refactor
export const SelectRecipePopup = ({
  currentItem,
  quantity,
  setShowPopup,
  recipes,
  resetOptions,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [didntSelect, setDidntSelect] = useState(false);
  const dispatch = useDispatch();

  const handleSelectRecipe = ({ target }) => {
    const { id } = target;
    setSelectedRecipe(id);
  };

  const handleSelect = () => {
    if (selectedRecipe) {
      const itemToAdd = {
        id: currentItem,
        amount: Number(quantity),
        recipe: selectedRecipe,
      };
      dispatch(addToOutput(itemToAdd));
      setShowPopup(false);
      setDidntSelect(false);
      setSelectedRecipe({});
      resetOptions();
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
