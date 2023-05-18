import ItemTreeFragment from "../ItemTreeFragment/ItemTreeFragment.component";
import { ItemTreeContainer } from "./ItemTreeDiv.styles";

const ItemTreeDiv = ({ outputItem }) => {
    return (
        <ItemTreeContainer>
            <ItemTreeFragment outputItem={outputItem} />
        </ItemTreeContainer>
    )
};

export default ItemTreeDiv;