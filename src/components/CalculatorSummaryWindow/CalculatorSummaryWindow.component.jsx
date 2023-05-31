import CalculatorSummaryElement from "../CalculatorSummaryElement/CalculatorSummaryElement.component";
import { SummaryWindowContainer, SummaryWindowInner, SummaryWindowOutter, TitleText, SummaryWindowContainerDiv } from "./CalculatorSummaryWindow.styles";


const CalculatorSummaryWindow = ({ title, toMap }) => {
    return (
        <SummaryWindowContainerDiv>
            <SummaryWindowContainer>
                <TitleText>{title}</TitleText>
                <SummaryWindowOutter>
                    <SummaryWindowInner>
                        {toMap.map((obj, idx) => {
                            return <CalculatorSummaryElement object={obj} key={idx} />
                        })}
                    </SummaryWindowInner>
                </SummaryWindowOutter>
            </SummaryWindowContainer>
        </SummaryWindowContainerDiv>
    )
}

export default CalculatorSummaryWindow;