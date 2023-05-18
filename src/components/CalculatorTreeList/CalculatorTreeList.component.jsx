import ItemTreeListElement from "../ItemTreeListElement/ItemTreeListElement.component";

import { CalculatorTreeListContainer } from "./CalculatorTreeList.styles";

const CalculatorTreeList = ({ matsArray }) => {
    return (
        <CalculatorTreeListContainer>
            {matsArray.map((outputItem, idx) => {
                return <ItemTreeListElement outputItem={outputItem} key={idx} />
            })}
        </CalculatorTreeListContainer>
    )
};

export default CalculatorTreeList;