import { robi } from "../../utils/helperFunctions";
import { FilteredItems, FilteredItem, ItemIcon, FilteredItemsContainer } from "./FilteredItemsList.styles";

const FilteredItemsList = ({ setCurrentItem, setSearchString, filteredItems }) => {

    const selectItem = (event) => {
        const selectedItem = event.target.id;
        const selectedRecipe = robi(selectedItem);
        setSearchString(selectedRecipe.name);
        setCurrentItem(selectedRecipe);
    };

    return (
        <FilteredItemsContainer>
            <FilteredItems>
                {filteredItems.map((item, idx) => {
                    const imgSrc = `./item-icons/${item.name.replace(/ /g, "-").toLowerCase()}.png`;

                    return <FilteredItem
                        onClick={selectItem}
                        key={idx}
                        id={item.id}
                    ><ItemIcon src={imgSrc} alt={item.name} />{item.name}</FilteredItem>
                })}
            </FilteredItems>
        </FilteredItemsContainer>
    )
}

export default FilteredItemsList;