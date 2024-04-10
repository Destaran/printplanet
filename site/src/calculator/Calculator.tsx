import { useSelector } from "react-redux";
import { outputValues } from "../redux/calculator/calculator.selector";
import { ItemSelect } from "../components/Calculator/ItemSelect/ItemSelect.component";
import { Summary } from "../components/Calculator/Summary/Summary";
import { ItemTree } from "../components/Calculator/ItemTree/ItemTree.component";
import { PageBase } from "../components/PageBase";

export const Calculator = () => {
  const output = useSelector(outputValues);
  return (
    <PageBase>
      <ItemSelect />
      {output.length > 0 && <Summary />}
      {output.length > 0 && <ItemTree />}
    </PageBase>
  );
};
