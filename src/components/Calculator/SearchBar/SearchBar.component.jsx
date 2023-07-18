import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { FilteredItemsList } from "../FilteredItemsList/FilteredItemsList.component";
import { FormInput } from "../FormInput/FormInput.component";

const ppBlue = "#14213d";

const Container = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
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
    color: #f4f1de;
    font-size: 16px;
  }
  img {
    height: 24px;
    width: auto;
    margin: 0 5px 0 5px;
    background-color: white;
    border: 2px solid black;
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
    const { value } = target;
    setSearchString(value);
  };

  return (
    <Container>
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
          <img src={getImageUrlById(currentItem)} alt={currentItem} />
        </CurrentItemContainer>
      ) : (
        <CurrentItemContainer>
          <p>No item selected</p>
        </CurrentItemContainer>
      )}
    </Container>
  );
};
