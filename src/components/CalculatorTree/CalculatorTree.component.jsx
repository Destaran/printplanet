import ItemTreeDiv from "../ItemTree/ItemTreeDiv.component";

import { useContext } from "react";

import { CalculatorContext } from "../../contexts/calculator.context";

import { CalculatorTreeContainer } from "./CalculatorTree.styles";

const CalculatorTree = () => {

    const { output } = useContext(CalculatorContext);

    return (
        <CalculatorTreeContainer>
            <p>Tree Overview</p>
            {output.map((outputItem, idx) => {
                return <ItemTreeDiv outputItem={outputItem} key={idx}/>
            })}
        </CalculatorTreeContainer>
    )
};

export default CalculatorTree;