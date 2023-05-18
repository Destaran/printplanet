import { useContext } from "react";

import { CalculatorContext } from "../../contexts/calculator.context";

import CalculatorSummaryWindow from "../CalculatorSummaryWindow/CalculatorSummaryWindow.component";

import { CalculatorSummaryContainer } from "./CalculatorSummary.styles";


const CalculatorSummary = () => {
    const { output, input, machines } = useContext(CalculatorContext);

    return (
        <CalculatorSummaryContainer>
            <CalculatorSummaryWindow title={"Desired Output"} toMap={output}/>
            <CalculatorSummaryWindow title={"Required Input"} toMap={input}/>
            <CalculatorSummaryWindow title={"Required Machines"} toMap={machines}/>
        </CalculatorSummaryContainer>
    )
}

export default CalculatorSummary;