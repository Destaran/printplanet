import { useSelector } from "react-redux";
import { outputValues } from "../redux/calculator/calculator.selector";
import { ItemSelect } from "./ItemSelect/ItemSelect";
import { Summary } from "./Summary/Summary";
import { ItemTree } from "./ItemTree/ItemTree";
import { PageBase } from "../components/PageBase";
import { Section } from "./Section";

export function Calculator() {
  const output = useSelector(outputValues);
  return (
    <PageBase>
      <Section name="Product Selection">
        <ItemSelect />
      </Section>
      {output.length > 0 && (
        <>
          <Section name="I/O Configurator">
            <Summary />
          </Section>
          <Section name="Production Trees">
            <ItemTree />
          </Section>
        </>
      )}
    </PageBase>
  );
}
