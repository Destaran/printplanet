import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { CurrentIndicator } from "./CurrentIndicator";

const Container = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

interface Props {
  selectItem: (id: React.MouseEvent<HTMLLIElement>) => void;
  currentItem: string;
  setCurrentItem: (id: string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export function Selection({
  selectItem,
  currentItem,
  setCurrentItem,
  searchString,
  setSearchString,
}: Props) {
  return (
    <Container>
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        selectItem={selectItem}
      />
      <CurrentIndicator currentItem={currentItem} />
    </Container>
  );
}
