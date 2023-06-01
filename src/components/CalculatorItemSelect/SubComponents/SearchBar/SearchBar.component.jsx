import { returnImageUrlById } from "../../../../utils/helperFunctions";

import CalculatorFormInput from "../../../CalculatorFormInput/CalculatorFormInput.component";
import FilteredItemsList from "../../../FilteredItemsList/FilteredItemsList.component";

import { SearchBarContainer, CurrentItemContainer } from "./SearchBar.styles";

const SearchBar = ({
  selectItem,
  currentItem,
  setCurrentItem,
  searchString,
  setSearchString,
}) => {
  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setSearchString(value);
    if (currentItem.id) {
      setCurrentItem({});
    }
  };

  return (
    <SearchBarContainer>
      <CalculatorFormInput
        autoFocus
        placeholder="Search item"
        type="text"
        value={searchString}
        name="item-search"
        onChange={handleSearchChange}
      />
      {searchString && !currentItem.id && (
        <FilteredItemsList
          selectItem={selectItem}
          setCurrentItem={setCurrentItem}
          setSearchString={setSearchString}
          searchString={searchString}
        />
      )}
      {currentItem.id ? (
        <CurrentItemContainer>
          <p>Current Item:</p>
          <img
            src={returnImageUrlById(currentItem.id)}
            alt={currentItem.name}
          />
        </CurrentItemContainer>
      ) : (
        <CurrentItemContainer>
          <p>No item selected</p>
        </CurrentItemContainer>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
