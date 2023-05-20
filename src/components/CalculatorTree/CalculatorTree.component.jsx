import { useSelector } from "react-redux";

import ItemTreeDiv from "../ItemTree/ItemTreeDiv.component";
import { CalculatorTreeContainer, TitleParagraph } from "./CalculatorTree.styles";

const CalculatorTree = () => {
    const output = useSelector((state) => state.calculator.output);

    return (
        <CalculatorTreeContainer>
            <TitleParagraph>Tree Overview</TitleParagraph>
            {output.map((outputItem, idx) => {
                return <ItemTreeDiv outputItem={outputItem} key={idx}/>
            })}
        </CalculatorTreeContainer>
    )
};

export default CalculatorTree;