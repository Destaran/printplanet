import {
  SelectRecipePopupContainer,
  InnerContainer,
  Header,
  InputContainer,
  ButtonsContainer,
} from "./SelectRecipePopup.styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToOutput } from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";
import { SelectRecipePopupButton } from "../SelectRecipePopupButton/SelectRecipePopupButton.component";
import { rrbi } from "../../../utils/helperFunctions";

export const SelectRecipePopup = ({
  currentItem,
  quantity,
  setShowPopup,
  recipes,
  resetOptions,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const dispatch = useDispatch();

  const handleSelectRecipe = ({ target }) => {
    const { id } = target;
    setSelectedRecipe(id);
  };

  const handleSelect = () => {
    const recipe = rrbi(selectedRecipe);
    const itemToAdd = {
      id: currentItem,
      amount: Number(quantity),
      recipe: recipe,
    };
    dispatch(addToOutput(itemToAdd));
    setShowPopup(false);
    setSelectedRecipe({});
    resetOptions();
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
        <ButtonsContainer>
          <Button onClick={handleSelect}>Select</Button>
        </ButtonsContainer>
      </InnerContainer>
    </SelectRecipePopupContainer>
  );
};
