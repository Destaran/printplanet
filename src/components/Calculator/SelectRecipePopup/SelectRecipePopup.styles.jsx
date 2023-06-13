import styled from "styled-components";

export const SelectRecipePopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const InnerContainer = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 8px;
  width: 100%;
  max-width: 440px;
  background-color: white;
`;

export const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 8px;
  }
`;

export const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: red;
`;
