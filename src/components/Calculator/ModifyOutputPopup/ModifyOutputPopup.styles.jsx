import styled from "styled-components";

export const CalculatorSummaryElementPopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const InnerContainer = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 8px;
  width: 100%;
  max-width: 240px;
  background-color: white;
`;

export const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    background-color: #313131;
    height: 36px;
    width: auto;
    padding: 4px;
    margin: 4px;
    border: 1px black solid;
  }
  input {
    height: 40px;
    font-size: 24px;
    width: 80px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 8px;
  }
`;
