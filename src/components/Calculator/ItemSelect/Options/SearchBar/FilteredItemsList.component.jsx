import styled from "styled-components";
import {
  getImageUrlById,
  getAllProducts,
  getNameById,
} from "../../../../../utils/helperFunctions";
import { useMemo } from "react";

const Container = styled.div`
  position: relative;
  top: -15px;
  width: 100%;
  z-index: 50;
`;

const FilteredItems = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 800px;
`;

const FilteredItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  border: solid black 1px;
  background-color: #f1f1f1;
  overflow: hidden;
  cursor: pointer;

  img {
    margin-right: 5px;
  }

  &:hover {
    background-color: orange;
  }
`;

const ItemIcon = styled.img`
  height: 32px;
  width: auto;
`;

export const FilteredItemsList = ({ selectItem, searchString }) => {
  const filteredItems = useMemo(
    () =>
      getAllProducts.filter((item) =>
        item.name
          .toLowerCase()
          .replace("-", " ")
          .includes(searchString.toLowerCase())
      ),
    [searchString]
  );

  return (
    <Container>
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
    </Container>
  );
};
