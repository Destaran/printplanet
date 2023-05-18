import ItemTreeFragment from "../ItemTreeFragment/ItemTreeFragment.component";
import { ItemTreeListElementContainer } from "./ItemTreeListElement.styles";

const ItemTreeListElement = ({ outputItem }) => {
    return (
        <ItemTreeListElementContainer>
            <ItemTreeFragment outputItem={outputItem} />
        </ItemTreeListElementContainer>
    )
};

export default ItemTreeListElement;