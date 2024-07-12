import { useSelector } from "react-redux";
import { outputValues } from "../redux/calculator/calculator.selector";
import { ItemSelect } from "./ItemSelect/ItemSelect";
import { Summary } from "./Summary/Summary";
import { ItemTree } from "./ItemTree/ItemTree";
import { PageBase } from "../components/PageBase";
import { CalculatorSection } from "./CalculatorSection";

export function Calculator() {
  const output = useSelector(outputValues);
  return (
    <PageBase>
      <CalculatorSection name="Item Select">
        <ItemSelect />
      </CalculatorSection>
      {output.length > 0 && (
        <>
          <CalculatorSection name="Summary">
            <Summary />
          </CalculatorSection>
          <CalculatorSection name="Item Tree">
            <ItemTree />
          </CalculatorSection>
        </>
      )}
    </PageBase>
  );
}
