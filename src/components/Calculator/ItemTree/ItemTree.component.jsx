import styled from "styled-components";
import { useSelector } from "react-redux";
import { calculatedOutput } from "../../../reduxStore/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv/TreeDiv.component";

const Container = styled.div``;

const Title = styled.p`
  margin: 0 0 1px 6px;
`;

export const ItemTree = () => {
  const output = useSelector(calculatedOutput);

  return (
    <Container>
      <Title>Tree Overview</Title>
      {output.map((outputItem, idx) => (
        <TreeDiv outputItem={outputItem} key={idx} />
      ))}
    </Container>
  );
};
