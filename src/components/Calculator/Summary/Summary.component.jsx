import { useSelector } from "react-redux";
import { selectOutput } from "../../../reduxStore/calculator/calculator.selector";
import { mapInput, mapMachines } from "../../../utils/helperFunctions";

import { SummaryWindow } from "../SummaryWindow/SummaryWindow.component";

import styled from "styled-components";

const CalculatorSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 22.5px;
  justify-content: space-around;
`;

export const Summary = () => {
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
      <SummaryWindow title={"Desired Output"} toMap={output} />
      <SummaryWindow title={"Required Input"} toMap={input} />
      <SummaryWindow title={"Required Machines"} toMap={machines} />
      {additionalOutput.length > 0 && (
        <SummaryWindow title={"Additional Output"} toMap={additionalOutput} />
      )}
    </CalculatorSummaryContainer>
  );
};
