import { useSelector } from "react-redux";

import ItemTreeDiv from "../ItemTree/ItemTreeDiv.component";
import { selectOutput } from "../../reduxStore/calculator/calculator.selector";
import { CalculatorTreeContainer, TitleParagraph } from "./CalculatorTree.styles";

const CalculatorTree = () => {
    const output = useSelector(selectOutput);

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