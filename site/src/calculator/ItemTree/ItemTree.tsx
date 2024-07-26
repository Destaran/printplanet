import { useSelector } from "react-redux";
import { calculatedOutput } from "../../redux/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv";
import { Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getImageUrlById } from "utils/helperFunctions";
import styled from "styled-components";
import { StyledTab } from "./StyledTab";

const TabIcon = styled.img`
  width: 36px;
  height: 36px;
  opacity: 0.7;
`;

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <div>
      <Tabs selectedTabClassName="selected">
        <TabList>
          {output.map((outputItem) => {
            const img = getImageUrlById(outputItem.id);
            return (
              <StyledTab key={outputItem.id}>
                <TabIcon src={img} key={outputItem.id} />
              </StyledTab>
            );
          })}
        </TabList>
        {output.map((outputItem) => (
          <TabPanel key={outputItem.id}>
            <TreeDiv outputItem={outputItem} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
