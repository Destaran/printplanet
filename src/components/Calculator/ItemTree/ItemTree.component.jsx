import { useSelector } from "react-redux";
import { ItemTreeDiv } from "../ItemTreeDiv/ItemTreeDiv.component";
import { calculatedOutput } from "../../../reduxStore/calculator/calculator.selector";
import { CalculatorTreeContainer, TitleParagraph } from "./ItemTree.styles";

export const ItemTree = () => {
  const output = useSelector(calculatedOutput);

  return (
    <CalculatorTreeContainer>
      <TitleParagraph>Tree Overview</TitleParagraph>
      {output.map((outputItem, idx) => (
        <ItemTreeDiv outputItem={outputItem} key={idx} />
      ))}
    </CalculatorTreeContainer>
  );
};
