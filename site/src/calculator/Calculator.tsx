import { useSelector } from "react-redux";
import { outputValues } from "../redux/calculator/calculator.selector";
import { ItemSelect } from "./ItemSelect/ItemSelect";
import { Summary } from "./Summary/Summary";
import { ItemTree } from "./ItemTree/ItemTree";
import { PageBase } from "../components/PageBase";

export function Calculator() {
  const output = useSelector(outputValues);
  return (
    <PageBase>
      <ItemSelect />
      {output.length > 0 && <Summary />}
      {output.length > 0 && <ItemTree />}
    </PageBase>
  );
}
