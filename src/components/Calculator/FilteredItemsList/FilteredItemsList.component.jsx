import {
  returnImageUrlById,
  allProducts,
  returnNameById,
} from "../../../utils/helperFunctions";
import { useMemo } from "react";
import {
  FilteredItems,
  FilteredItem,
  ItemIcon,
  FilteredItemsContainer,
} from "./FilteredItemsList.styles";

export const FilteredItemsList = ({ selectItem, searchString }) => {
  const filteredItems = useMemo(
    () =>
      allProducts.filter((item) =>
        item.name.toLowerCase().includes(searchString)
      ),
    [searchString]
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
