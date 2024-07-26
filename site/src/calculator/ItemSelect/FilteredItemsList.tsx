import styled from "styled-components";
import { getImageUrlById, getNameById } from "../../utils/helperFunctions";
import { useMemo } from "react";
import { useAllProducts } from "./useAllProducts";

const Container = styled.div`
  position: absolute;
  top: 41px;
  width: 100%;
  z-index: 50;
`;

const FilteredItems = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 80vh;
  overflow-y: auto;
`;

const FilteredItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  border: solid black 1px;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  transition: all 1s;

  img {
    margin-right: 5px;
  }

  &:hover {
    background-color: orange;
    transition: all 0.3s;
  }
  &:active {
    background-color: white;
    transition: all 0.2s;
  }
`;

const ItemIcon = styled.img`
  height: 32px;
  width: auto;
`;

interface Props {
  selectItem: (id: React.MouseEvent<HTMLLIElement>) => void;
  searchString: string;
}

export function FilteredItemsList({ selectItem, searchString }: Props) {
  const allItems = useAllProducts();
  const filteredItems = useMemo(
    () =>
      allItems.filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchString.toLowerCase().replace(" ", "-"))
      ),
    [searchString]
  );

  return (
    <Container>
      <FilteredItems>
        {filteredItems.map((item) => {
          const imgSrc = getImageUrlById(item.name);
          const name = getNameById(item.name);

          return (
            <FilteredItem
              onClick={(e: React.MouseEvent<HTMLLIElement>) => selectItem(e)}
              key={item.name}
              id={item.name}
            >
              <ItemIcon src={imgSrc} />
              {name}
            </FilteredItem>
          );
        })}
      </FilteredItems>
    </Container>
  );
}
