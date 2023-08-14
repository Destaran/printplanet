import styled from "styled-components";
import { getImageUrlById } from "../../../../../utils/helperFunctions";
import { FilteredItemsList } from "./FilteredItemsList.component";
import { FormInput } from "../../../FormInput/FormInput.component";

const ppBlue = "#14213d";

const Container = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CurrentItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
  height: 30px;
  background-color: ${ppBlue};
  p {
    margin: 0;
    color: white;
    font-size: 16px;
  }
  img {
    height: 24px;
    width: auto;
    margin: 0 5px 0 5px;
    background-color: #313131;
    border: 1px solid #b47500;
  }
`;

export const SearchBar = ({
  selectItem,
  currentItem,
  setCurrentItem,
  searchString,
  setSearchString,
}) => {
  const handleSearchChange = ({ target }) => {
    if (currentItem) {
      setCurrentItem("");
    }
    setSearchString(target.value);
  };

  const handleInputFocus = ({ target }) => {
    target.select();
  };

  return (
    <Container>
      <SearchBarContainer>
        <FormInput
          autoFocus
          placeholder="Search Item"
          type="text"
          value={searchString}
          name="item-search"
          onChange={handleSearchChange}
          onFocus={handleInputFocus}
        />
        {searchString && !currentItem && (
          <FilteredItemsList
            selectItem={selectItem}
            setCurrentItem={setCurrentItem}
            setSearchString={setSearchString}
            searchString={searchString}
          />
        )}
      </SearchBarContainer>
      <CurrentItemContainer>
        {currentItem ? (
          <>
            <p>Current Item:</p>
            <img src={getImageUrlById(currentItem)} alt={currentItem} />
          </>
        ) : (
          <p>No item selected</p>
        )}
      </CurrentItemContainer>
    </Container>
  );
};
