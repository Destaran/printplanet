import {
  returnImageUrlById,
  allProducts,
  returnNameById,
} from "../../../utils/helperFunctions";
import {
  FilteredItems,
  FilteredItem,
  ItemIcon,
  FilteredItemsContainer,
} from "./FilteredItemsList.styles";

export const FilteredItemsList = ({ selectItem, searchString }) => {
  // wrap in useMemo
  const filteredItems = allProducts.filter((item) =>
    item.name.toLowerCase().includes(searchString)
  );

  return (
    <FilteredItemsContainer>
      <FilteredItems>
        {filteredItems.map((item, idx) => {
          const imgSrc = returnImageUrlById(item.name);
          const name = returnNameById(item.name);

          return (
            <FilteredItem onClick={selectItem} key={idx} id={item.name}>
              <ItemIcon src={imgSrc} alt={name} />
              {name}
            </FilteredItem>
          );
        })}
      </FilteredItems>
    </FilteredItemsContainer>
  );
};
