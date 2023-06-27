import styled from "styled-components";

export const FilteredItemsContainer = styled.div`
  position: relative;
  top: -15px;
  width: 100%;
  z-index: 50;
`;

export const FilteredItems = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 800px;
`;

export const FilteredItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  border: solid black 1px;
  background-color: #f1f1f1;
  overflow: hidden;

  img {
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
    background-color: orange;
  }
`;

export const ItemIcon = styled.img`
  height: 32px;
  width: auto;
`;
