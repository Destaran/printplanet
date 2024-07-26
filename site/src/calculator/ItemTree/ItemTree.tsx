import { useSelector } from "react-redux";
import { calculatedOutput } from "../../redux/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getImageUrlById } from "utils/helperFunctions";
import styled from "styled-components";

const TabIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const StyledTabs = styled(Tabs)``;

const StyledTabList = styled(TabList)`
  padding: 0;
`;

const StyledTab = styled(Tab)`
  display: inline-block;
  border-left: 4px solid;
  position: relative;
  list-style: none;
  padding: 3px 6px;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.darkOrange};
  background-color: ${({ theme }) => theme.colors.grey};

  img {
    filter: brightness(0.8);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
  }

  &.selected {
    border-color: ${({ theme }) => theme.colors.orange};
    background-color: ${({ theme }) => theme.colors.blue};

    img {
      filter: brightness(1);
    }
  }

  transition: all 1s;

  &:hover {
    transition: all 0.2s;
    background-color: ${({ theme }) => theme.colors.blue2};
    img {
      filter: brightness(1);
    }
  }

  &:active {
    transition: all 0.2s;
    background-color: ${({ theme }) => theme.colors.grey};
    img {
      filter: brightness(1);
    }
  }
`;

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <div>
      <StyledTabs selectedTabClassName="selected">
        <StyledTabList>
          {output.map((outputItem) => {
            const img = getImageUrlById(outputItem.id);
            return (
              <StyledTab key={outputItem.id}>
                <TabIcon src={img} />
              </StyledTab>
            );
          })}
        </StyledTabList>
        {output.map((outputItem) => (
          <TabPanel>
            <TreeDiv outputItem={outputItem} key={outputItem.id} />
          </TabPanel>
        ))}
      </StyledTabs>
    </div>
  );
}
