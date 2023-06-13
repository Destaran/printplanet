import { ItemTreeListElement } from "../ItemTreeListElement/ItemTreeListElement.component";

import { ItemTreeListContainer } from "./ItemTreeList.styles";

export const ItemTreeList = ({ ingredients, pid }) => {
  // const amountCalc = {amount} {recipe}-hez mennyi {outputItem} kell

  return (
    <ItemTreeListContainer>
      {ingredients.map((outputItem, idx) => {
        return (
          <ItemTreeListElement
            outputItem={{ ...outputItem }}
            key={idx}
            pid={pid}
          />
        );
      })}
    </ItemTreeListContainer>
  );
};
