import { Tab } from "react-tabs";
import styled from "styled-components";

export const StyledTab = styled(Tab)`
  display: inline-block;
  border-left: 4px solid;
  position: relative;
  list-style: none;
  padding: 3px 6px;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.darkOrange};
  background-color: ${({ theme }) => theme.colors.grey};
  transition: all 1s;

  &.selected {
    transition: all 0.2s;
    border-color: ${({ theme }) => theme.colors.orange};
    background-color: ${({ theme }) => theme.colors.blue};
    img {
      opacity: 1;
    }
  }

  &:hover {
    transition: all 0.2s;
    border-color: ${({ theme }) => theme.colors.orange};
    background-color: ${({ theme }) => theme.colors.blue2};
    img {
      opacity: 1;
    }
  }

  &:active {
    transition: all 0.2s;
    background-color: ${({ theme }) => theme.colors.blue};
    background-color: ${({ theme }) => theme.colors.grey};
    img {
      transform: scale(0.8);
    }
  }
`;
