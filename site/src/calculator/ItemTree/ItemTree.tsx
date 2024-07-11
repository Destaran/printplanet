import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { calculatedOutput } from "../../redux/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv";

const MountAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const Container = styled.div`
  animation: ${MountAnimation} 0.5s ease-out;
`;

const Title = styled.p``;

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <Container>
      <Title>Tree Overview</Title>
      {output.map((outputItem, idx) => (
        <TreeDiv outputItem={outputItem} key={idx} />
      ))}
    </Container>
  );
}
