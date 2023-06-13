import { SummaryWindow } from "../SummaryWindow/SummaryWindow.component";

import { useSelector } from "react-redux";
import {
  outputArray,
  inputArray,
} from "../../../reduxStore/calculator/calculator.selector";

import styled from "styled-components";

const CalculatorSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 22.5px;
  justify-content: space-around;
`;

export const Summary = () => {
  const output = useSelector(outputArray);
  const input = useSelector(inputArray);
  const machines = [];
  const additionalOutput = [];

  return (
    <CalculatorSummaryContainer>
      <SummaryWindow title={"Desired Output"} toMap={output} />
      <SummaryWindow title={"Required Input"} toMap={input} input={"input"} />
      <SummaryWindow title={"Required Machines"} toMap={machines} />
      {additionalOutput.length > 0 && (
        <SummaryWindow title={"Additional Output"} toMap={additionalOutput} />
      )}
    </CalculatorSummaryContainer>
  );
};
