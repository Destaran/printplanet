import styled from "styled-components";

const ppBlue = "#14213d";

export const Container = styled.div`
  display: flex;
  justify-content: start;
  height: 112px;
  margin-bottom: 22.5px;
  input,
  select {
    border-radius: 0px;
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
