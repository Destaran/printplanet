
import ItemTreeListElement from "../ItemTreeListSpan/ItemTreeListSpan.component";

import { useState, useContext } from "react";
import { CalculatorContext } from "../../contexts/calculator.context";

import CalculatorTreeList from "../CalculatorTreeList/CalculatorTreeList.component";

const ItemTreeFragment = ( {outputItem} ) => {
    const { robi } = useContext(CalculatorContext);
    const [showMats, setShowMats] = useState(false);
    const { id, amount } = outputItem;

    const itemObject = robi(id);
    const matsArray = itemObject.recipe;

    const matsArrayTrue = [];

    matsArray.ingredients.forEach(obj => {
        const objToPush = {
            id: obj.id,
            amount: obj.amount * amount / matsArray.yield
        };
        matsArrayTrue.push(objToPush);
    });

    const handleClick = () => {
        setShowMats(!showMats);
    };


    return (
        <>
            <ItemTreeListElement outputItem={outputItem} handleClick={handleClick} />
            {showMats && <CalculatorTreeList matsArray={matsArrayTrue} />}
        </>
    )
};

export default ItemTreeFragment;