import { useSelector } from "react-redux";
import { selectOutput } from "../../reduxStore/calculator/calculator.selector";
import { mapInput, mapMachines } from "../../utils/helperFunctions";

import CalculatorSummaryWindow from "../CalculatorSummaryWindow/CalculatorSummaryWindow.component";
import { CalculatorSummaryContainer } from "./CalculatorSummary.styles";


const CalculatorSummary = () => {
    const output = useSelector(selectOutput);
    let input = [];
    let machines = [];
    output.forEach(element => {
        mapInput(element, input);
    });
    output.forEach(element => {
        mapMachines(element, machines);
    })

    return (
        <CalculatorSummaryContainer>
            <CalculatorSummaryWindow title={"Desired Output"} toMap={output} />
            <CalculatorSummaryWindow title={"Required Input"} toMap={input} />
            <CalculatorSummaryWindow title={"Required Machines"} toMap={machines} />
        </CalculatorSummaryContainer>
    )
}

export default CalculatorSummary;