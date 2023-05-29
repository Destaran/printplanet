
import ItemTreeListElement from "../ItemTreeListSpan/ItemTreeListSpan.component";
import ItemTreeList from "../ItemTreeList/ItemTreeList.component";

import { robi } from "../../utils/helperFunctions";
import { useDispatch } from "react-redux";
import { extendElement, collapseElement } from "../../reduxStore/calculator/calculator.slice";

const ItemTreeFragment = ({ outputItem, pid }) => {
    const { id, amount, ingredients, uid } = outputItem;
    const item = robi(id);
    const expandable = item.recipe.ingredients.length;
    const dispatch = useDispatch();
    
    const handleClick = (event) => {
        if (event.shiftKey && event.button === 0) {
            // Additional logic for Shift+Left Click
            console.log('Shift+Left Click detected!');
          }
        if (!ingredients && expandable > 0) {
            const objectInfo = {
                id: id,
                amount: amount,
                uid: uid,
                parentId: pid
            }
            dispatch(extendElement(objectInfo));
        } else if (pid !== id && expandable > 0) {
            const objectInfo = {
                uid: uid,
                parentId: pid
            }
            dispatch(collapseElement(objectInfo));
        }
    };

    return (
        <>
            <ItemTreeListElement outputItem={outputItem} handleClick={handleClick} />
            {ingredients && <ItemTreeList ingredients={ingredients} pid={pid} />}
        </>
    )
};

export default ItemTreeFragment;