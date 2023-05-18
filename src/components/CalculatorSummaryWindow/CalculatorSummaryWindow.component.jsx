import CalculatorSummaryElement from "../CalculatorSummaryElement/CalculatorSummaryElement.component";
import { SummaryWindowContainer, SummaryWindowInner, SummaryWindowOutter, TitleText } from "./CalculatorSummaryWindow.styles";


const CalculatorSummaryWindow = ({ title, toMap }) => {
    return (
        <SummaryWindowContainer>
            <TitleText>{title}</TitleText>
            <SummaryWindowOutter>
                <SummaryWindowInner>
                    {toMap.map((obj, idx) => {
                        return <CalculatorSummaryElement object={obj} key={idx}/>
                    })}
                </SummaryWindowInner>
            </SummaryWindowOutter>
        </SummaryWindowContainer>
    )
}

export default CalculatorSummaryWindow;