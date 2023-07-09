import {
  getImageUrlById,
  allProducts,
  getNameById,
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
          const imgSrc = getImageUrlById(item.name);
          const name = getNameById(item.name);

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
