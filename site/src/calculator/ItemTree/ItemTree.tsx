import { useSelector } from "react-redux";
import { calculatedOutput } from "../../redux/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getImageUrlById } from "utils/helperFunctions";
import styled from "styled-components";

const TabIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const StyledTabs = styled(Tabs)``;

const StyledTabList = styled(TabList)`
  padding: 0;
`;

const StyledTab = styled(Tab)`
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;
`;

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <div>
      <StyledTabs>
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
