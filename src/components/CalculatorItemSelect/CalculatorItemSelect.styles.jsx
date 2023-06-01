import styled from "styled-components";

const ppBlue = "#14213d";
const ppBrown = "#8e5c00";

export const CalculatorItemSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 112px;
  margin-bottom: 22.5px;
  input,
  select {
    border-radius: 0px;
  }
`;

export const MachinesContainer = styled.div`
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

export const DefaultMachines = styled.div``;
