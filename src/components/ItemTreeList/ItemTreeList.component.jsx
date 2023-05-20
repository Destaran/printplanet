import ItemTreeListElement from "../ItemTreeListElement/ItemTreeListElement.component";

import { ItemTreeListContainer } from "./ItemTreeList.styles";

const ItemTreeList = ({ matsArray }) => {
    return (
        <ItemTreeListContainer>
            {matsArray.map((outputItem, idx) => {
                return <ItemTreeListElement outputItem={outputItem} key={idx} />
            })}
        </ItemTreeListContainer>
    )
};

export default ItemTreeList;