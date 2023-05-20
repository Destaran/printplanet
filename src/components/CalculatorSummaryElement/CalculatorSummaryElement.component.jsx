import { returnImageUrlById } from "../../utils/helperFunctions";

import { useDispatch } from "react-redux";
import { removeFromOutput } from "../../reduxStore/calculator/calculator.slice";

import { OutterElementContainer, InnerElementContainer, ImgContainer, NumberContainer } from "./CalculatorSummaryElement.styles";


const CalculatorSummaryElement = ({ object }) => {
    const { amount, id } = object;
    const dispatch = useDispatch();
    const imgUrl = returnImageUrlById(id);

    const removeItem = () => {
        dispatch(removeFromOutput(id))
    };

    return (
        <OutterElementContainer onClick={removeItem}>
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