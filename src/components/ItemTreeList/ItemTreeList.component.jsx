import ItemTreeListElement from "../ItemTreeListElement/ItemTreeListElement.component";

import { ItemTreeListContainer } from "./ItemTreeList.styles";

const ItemTreeList = ({ ingredients, pid }) => {
    return (
        <ItemTreeListContainer>
            {ingredients.map((outputItem, idx) => {
                return <ItemTreeListElement outputItem={outputItem} key={idx} pid={pid} />
            })}
        </ItemTreeListContainer>
    )
};

export default ItemTreeList;