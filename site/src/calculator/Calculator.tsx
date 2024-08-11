import { useSelector } from "react-redux";
import { outputValues } from "../redux/calculator/calculator.selector";
import { ItemSelect } from "./ItemSelect/ItemSelect";
import { Summary } from "./Summary/Summary";
import { ItemTree } from "./ItemTree/ItemTree";
import { PageBase } from "../components/PageBase";
import { Section } from "./Section";
import { useAuth0 } from "@auth0/auth0-react";
import { PlanManager } from "./PlanManager/PlanManager";

export function Calculator() {
  const { isAuthenticated, user } = useAuth0();
  const output = useSelector(outputValues);
  return (
    <PageBase>
      {isAuthenticated && user && (
        <Section name="Plan Manager">
          <PlanManager />
        </Section>
      )}
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
