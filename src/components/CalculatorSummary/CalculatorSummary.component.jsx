import CalculatorSummaryWindow from "../CalculatorSummaryWindow/CalculatorSummaryWindow.component";

import { CalculatorSummaryContainer } from "./CalculatorSummary.styles";


const CalculatorSummary = () => {
    return (
        <CalculatorSummaryContainer>
            <CalculatorSummaryWindow title={"Output"}/>
            <CalculatorSummaryWindow title={"Input"}/>
            <CalculatorSummaryWindow title={"Machines"}/>
        </CalculatorSummaryContainer>
    )
}

export default CalculatorSummary;