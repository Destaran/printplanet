import { useSelector } from "react-redux";
import { selectOutput, selectInput, selectMachines } from "../../reduxStore/calculator/calculator.selector";
import { mapInput } from "../../utils/helperFunctions";

import CalculatorSummaryWindow from "../CalculatorSummaryWindow/CalculatorSummaryWindow.component";
import { CalculatorSummaryContainer } from "./CalculatorSummary.styles";


const CalculatorSummary = () => {
    const output = useSelector(selectOutput);
    // const input = useSelector(selectInput);
    const machines = useSelector(selectMachines);
    let input = [];
    output.forEach(element => {
        mapInput(element, input);
    });

    return (
        <CalculatorSummaryContainer>
            <CalculatorSummaryWindow title={"Desired Output"} toMap={output} />
            <CalculatorSummaryWindow title={"Required Input"} toMap={input} />
            <CalculatorSummaryWindow title={"Required Machines"} toMap={machines} />
        </CalculatorSummaryContainer>
    )
}

export default CalculatorSummary;