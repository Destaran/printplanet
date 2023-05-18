import { OutterElementContainer, InnerElementContainer, ImgContainer, NumberContainer } from "./CalculatorSummaryElement.styles";

import { returnImageUrlById } from "../../utils/helperFunctions";

const CalculatorSummaryElement = ({ object }) => {
    const { amount, id } = object;
    const imgUrl = returnImageUrlById(id);

    return (
        <OutterElementContainer>
            <InnerElementContainer>
                <ImgContainer>
                    <img src={imgUrl} />
                </ImgContainer>
                <NumberContainer>
                    <p>{amount}</p>
                </NumberContainer>
            </InnerElementContainer>
        </OutterElementContainer>
    )
};

export default CalculatorSummaryElement;