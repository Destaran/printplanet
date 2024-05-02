import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { FilteredItemsList } from "./FilteredItemsList";
import { FormInput } from "../../FormInput";

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
  background-color: ${({ theme }) => theme.colors.blue};
  p {
    margin: 0;
    color: white;
    font-size: 16px;
  }
  img {
    height: 24px;
    width: auto;
    margin: 0 5px 0 5px;
    background-color: ${({ theme }) => theme.colors.grey};
    border: 1px solid ${({ theme }) => theme.colors.orange};
  }
`;

export const SearchBar = ({
  // @ts-expect-error
  selectItem,
  // @ts-expect-error
  currentItem,
  // @ts-expect-error
  setCurrentItem,
  // @ts-expect-error
  searchString,
  // @ts-expect-error
  setSearchString,
}) => {
  // @ts-expect-error
  const handleSearchChange = ({ target }) => {
    if (currentItem) {
      setCurrentItem("");
    }
    setSearchString(target.value);
  };

  // @ts-expect-error
  const handleInputFocus = ({ target }) => {
    target.select();
  };

  return (
    <Container>
      <SearchBarContainer>
        <FormInput
          // @ts-expect-error
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
            // @ts-expect-error
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
