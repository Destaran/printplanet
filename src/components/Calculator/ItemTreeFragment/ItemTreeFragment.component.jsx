import { ItemTreeList } from "../ItemTreeList/ItemTreeList.component";
import { ItemTreeListSpan } from "../ItemTreeListSpan/ItemTreeListSpan.component";

export const ItemTreeFragment = ({ outputItem, pid }) => {
  const { ingredients } = outputItem;

  return (
    <>
      <ItemTreeListSpan outputItem={outputItem} />
      {ingredients && <ItemTreeList ingredients={ingredients} pid={pid} />}
    </>
  );
};
