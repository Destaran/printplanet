
import ItemTreeListElement from "../ItemTreeListSpan/ItemTreeListSpan.component";

import { useState } from "react";

import ItemTreeList from "../ItemTreeList/ItemTreeList.component";

import { robi } from "../../utils/helperFunctions";

const ItemTreeFragment = ( {outputItem} ) => {
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
            {showMats && <ItemTreeList matsArray={matsArrayTrue} />}
        </>
    )
};

export default ItemTreeFragment;