import { useSelector } from "react-redux";
import { selectOutput } from "../../reduxStore/calculator/calculator.selector";
import { mapInput, mapMachines } from "../../utils/helperFunctions";

import CalculatorSummaryWindow from "../CalculatorSummaryWindow/CalculatorSummaryWindow.component";
import styled from "styled-components";

const CalculatorSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 22.5px;
  justify-content: space-around;
`;

const CalculatorSummary = () => {
  const output = useSelector(selectOutput);
  let input = [];
  let machines = [];
  output.forEach((element) => {
    mapInput(element, input);
  });
  output.forEach((element) => {
    mapMachines(element, machines);
  });
  let additionalOutput = [];

  return (
    <CalculatorSummaryContainer>
      <CalculatorSummaryWindow title={"Desired Output"} toMap={output} />
      <CalculatorSummaryWindow title={"Required Input"} toMap={input} />
      <CalculatorSummaryWindow title={"Required Machines"} toMap={machines} />
      {additionalOutput.length > 0 && (
        <CalculatorSummaryWindow
          title={"Additional Output"}
          toMap={additionalOutput}
        />
      )}
    </CalculatorSummaryContainer>
  );
};

export default CalculatorSummary;
