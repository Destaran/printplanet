import {
    OutterElementContainer,
    InnerElementContainer,
    ImgContainer,
    NumberContainer,
    ItemTreeListSpanContainer
} from "./ItemTreeListSpan.styles";

import { returnImageUrlById } from "../../utils/helperFunctions";

const ItemTreeListSpan = ({ outputItem, handleClick }) => {
    const { amount, id } = outputItem;
    const imgUrl = returnImageUrlById(id);

    return (
        <>
            <ItemTreeListSpanContainer onClick={handleClick}>
                <OutterElementContainer>
                    <InnerElementContainer>
                        <ImgContainer>
                            <img src={imgUrl} />
                        </ImgContainer>
                        <NumberContainer>
                            <p>{amount}</p>
                        </NumberContainer>
                    </InnerElementContainer>
                </OutterElementContainer>
            </ItemTreeListSpanContainer>
        </>
    )
};

export default ItemTreeListSpan;