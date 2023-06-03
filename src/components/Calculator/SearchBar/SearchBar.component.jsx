import { returnImageUrlById } from "../../../utils/helperFunctions";

import { FormInput } from "../FormInput/FormInput.component";
import { FilteredItemsList } from "../FilteredItemsList/FilteredItemsList.component";

import { SearchBarContainer, CurrentItemContainer } from "./SearchBar.styles";

export const SearchBar = ({
  selectItem,
  currentItem,
  setCurrentItem,
  searchString,
  setSearchString,
}) => {
  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setSearchString(value);
  };

  return (
    <SearchBarContainer>
      <FormInput
        autoFocus
        placeholder="Search item"
        type="text"
        value={searchString}
        name="item-search"
        onChange={handleSearchChange}
      />
      {searchString && currentItem !== searchString && (
        <FilteredItemsList
          selectItem={selectItem}
          setCurrentItem={setCurrentItem}
          setSearchString={setSearchString}
          searchString={searchString}
        />
      )}
      {currentItem ? (
        <CurrentItemContainer>
          <p>Current Item:</p>
          <img src={returnImageUrlById(currentItem)} alt={currentItem} />
        </CurrentItemContainer>
      ) : (
        <CurrentItemContainer>
          <p>No item selected</p>
        </CurrentItemContainer>
      )}
    </SearchBarContainer>
  );
};
