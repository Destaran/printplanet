import styled from "styled-components";

const ppBlue = "#14213d";

export const SelectionContainer = styled.div`
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

export const UnitSelectContainer = styled.div`
  width: 15%;
  select {
    height: 43px;
  }
`;

export const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  button {
    margin: 0;
    height: 32px;
    width: 100%;
    border-radius: 0;
  }
`;
