import { items } from "../../../utils/helperFunctions";
import { returnImageUrlById } from "../../../utils/helperFunctions";
import {
  FilteredItems,
  FilteredItem,
  ItemIcon,
  FilteredItemsContainer,
} from "./FilteredItemsList.styles";

export const FilteredItemsList = ({ selectItem, searchString }) => {
  // wrap in useMemo
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchString)
  );

  return (
    <FilteredItemsContainer>
      <FilteredItems>
        {filteredItems.map((item, idx) => {
          const imgSrc = returnImageUrlById(item.id);

          return (
            <FilteredItem onClick={selectItem} key={idx} id={item.id}>
              <ItemIcon src={imgSrc} alt={item.name} />
              {item.name}
            </FilteredItem>
          );
        })}
      </FilteredItems>
    </FilteredItemsContainer>
  );
};
