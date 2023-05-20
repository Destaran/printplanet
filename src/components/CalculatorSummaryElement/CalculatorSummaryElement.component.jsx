import { returnImageUrlById } from "../../utils/helperFunctions";
import { useState } from "react";
import CalculatorSummaryElementPopup from "../CalculatorSummaryElementPopup/CalculatorSummaryElementPopup.component";
import { OutterElementContainer, InnerElementContainer, ImgContainer, NumberContainer } from "./CalculatorSummaryElement.styles";


const CalculatorSummaryElement = ({ object }) => {
    const { amount, id } = object;
    const [showPopup, setShowPopup] = useState(false);
    const imgUrl = returnImageUrlById(id);

    const removeItem = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
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
            {showPopup && <CalculatorSummaryElementPopup object={object} setShowPopup={setShowPopup}/>}
        </>
    )
};

export default CalculatorSummaryElement;