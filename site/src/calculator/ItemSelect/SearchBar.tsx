import { FormInput } from "components/FormInput";
import styled from "styled-components";
import { FilteredItemsList } from "./FilteredItemsList";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

interface Props {
  searchString: string;
  setSearchString: (searchString: string) => void;
  currentItem: string;
  setCurrentItem: (id: string) => void;
  selectItem: (id: React.MouseEvent<HTMLLIElement>) => void;
}

export function SearchBar({
  searchString,
  setSearchString,
  currentItem,
  setCurrentItem,
  selectItem,
}: Props) {
  function handleSearchChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (currentItem) {
      setCurrentItem("");
    }
    setSearchString(target.value);
  }

  function handleSearchFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    target.select();
  }

  return (
    <Container>
      <FormInput
        autoFocus
        placeholder="Search Product"
        type="text"
        value={searchString}
        name="item-search"
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
      />
      {searchString && !currentItem && (
        <FilteredItemsList
          selectItem={selectItem}
          searchString={searchString}
        />
      )}
    </Container>
  );
}
