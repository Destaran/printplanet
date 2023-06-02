import styled from "styled-components";

const ppBlue = "#14213d";

export const MenusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 10%;
  border: 1px solid ${ppBlue};
  padding: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  button {
    margin: 2px;
    height: 28px;
  }
`;
