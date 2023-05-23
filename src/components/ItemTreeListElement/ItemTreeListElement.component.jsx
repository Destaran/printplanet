import ItemTreeFragment from "../ItemTreeFragment/ItemTreeFragment.component";
import { ItemTreeListElementContainer } from "./ItemTreeListElement.styles";

const ItemTreeListElement = ({ outputItem, pid }) => {
    return (
        <ItemTreeListElementContainer>
            <ItemTreeFragment outputItem={outputItem} pid={pid} />
        </ItemTreeListElementContainer>
    )
};

export default ItemTreeListElement;