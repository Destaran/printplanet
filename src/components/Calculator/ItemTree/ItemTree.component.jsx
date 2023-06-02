import { useSelector } from "react-redux";
import { ItemTreeDiv } from "../ItemTreeDiv/ItemTreeDiv.component";
import { selectOutput } from "../../../reduxStore/calculator/calculator.selector";
import { CalculatorTreeContainer, TitleParagraph } from "./ItemTree.styles";

export const ItemTree = () => {
  const output = useSelector(selectOutput);

  return (
    <CalculatorTreeContainer>
      <TitleParagraph>Tree Overview</TitleParagraph>
      {output.map((outputItem, idx) => (
        <ItemTreeDiv outputItem={outputItem} key={idx} />
      ))}
    </CalculatorTreeContainer>
  );
};
