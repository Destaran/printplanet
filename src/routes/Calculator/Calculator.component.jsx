import styled from "styled-components";
import { useSelector } from "react-redux";
import { outputValues } from "../../reduxStore/calculator/calculator.selector";
import { ItemSelect } from "../../components/Calculator/ItemSelect/ItemSelect.component";
import { Summary } from "../../components/Calculator/Summary/Summary.component";
import { ItemTree } from "../../components/Calculator/ItemTree/ItemTree.component";

export const Container = styled.div`
  margin: 0px auto;
  padding: 30px;
  width: 85%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

const Calculator = () => {
  const output = useSelector(outputValues);
  return (
    <Container>
      <ItemSelect />
      {output.length > 0 && <Summary />}
      {output.length > 0 && <ItemTree />}
    </Container>
  );
};

export default Calculator;
