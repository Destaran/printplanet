import { OutterElementContainer, InnerElementContainer, ImgContainer, NumberContainer } from "./CalculatorSummaryElement.styles";


const CalculatorSummaryElement = () => {
    return (
        <OutterElementContainer>
            <InnerElementContainer>
                <ImgContainer>
                    <img src="./item-icons/accumulator.png" alt="" />
                </ImgContainer>
                <NumberContainer>
                    <p>25</p>
                </NumberContainer>
            </InnerElementContainer>
        </OutterElementContainer>
    )
}

export default CalculatorSummaryElement;