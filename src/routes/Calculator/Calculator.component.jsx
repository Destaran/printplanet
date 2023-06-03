import { ItemSelect } from "../../components/Calculator/ItemSelect/ItemSelect.component";
import { Summary } from "../../components/Calculator/Summary/Summary.component";
import { ItemTree } from "../../components/Calculator/ItemTree/ItemTree.component";
import { useSelector } from "react-redux";
import { outputArray } from "../../reduxStore/calculator/calculator.selector";
import { CalculatorContainer } from "./Calculator.styles";

const Calculator = () => {
  const output = useSelector(outputArray);
  return (
    <CalculatorContainer>
      <ItemSelect />
      {output.length > 0 && <Summary />}
      {output.length > 0 && <ItemTree />}
    </CalculatorContainer>
  );
};

export default Calculator;
