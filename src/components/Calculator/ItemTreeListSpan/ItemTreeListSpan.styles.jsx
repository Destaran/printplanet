import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0;
  padding: 5px 0 0 0;
  display: list-item;
  list-style: none;
  height: 46px;

  position: sticky;
  top: 0;
  z-index: 10;
`;

export const ItemTreeListSpanContainer = styled.div`
  display: inline-flex;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: black;
  user-select: none;
  align-items: top;
`;
