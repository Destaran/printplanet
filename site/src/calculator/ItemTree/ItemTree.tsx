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

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <div>
      <Tabs>
        <TabList>
          {output.map((outputItem) => {
            const img = getImageUrlById(outputItem.id);
            return (
              <Tab key={outputItem.id}>
                <TabIcon src={img} />
              </Tab>
            );
          })}
        </TabList>
        {output.map((outputItem) => (
          <TabPanel>
            <TreeDiv outputItem={outputItem} key={outputItem.id} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
