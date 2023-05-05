import CalculatorSummaryElement from "../CalculatorSummaryElement/CalculatorSummaryElement.component";
import { SummaryWindowContainer, SummaryWindowInner, SummaryWindowOutter, TitleText } from "./CalculatorSummaryWindow.styles";


const CalculatorSummaryWindow = ({ title }) => {
    return (
        <SummaryWindowContainer>
            <TitleText>{title}</TitleText>
            <SummaryWindowOutter>
                <SummaryWindowInner>
                    <CalculatorSummaryElement />
                    <CalculatorSummaryElement />
                    <CalculatorSummaryElement />
                </SummaryWindowInner>
            </SummaryWindowOutter>
        </SummaryWindowContainer>
    )
}

export default CalculatorSummaryWindow;