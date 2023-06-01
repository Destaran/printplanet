import styled from "styled-components";

const ppBlue = "#14213d";

export const QuantitySelectContainer = styled.div`
  width: 110px;
  margin-right: 10px;
`;

export const BeltsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BeltContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: 2px solid black;
  background-color: ${ppBlue};

  &:hover {
    background-color: orange;
    cursor: pointer;
  }

  &:active {
    background-color: ${ppBlue};
  }
`;

export const BeltButton = styled.img`
  width: 24px;
  height: auto;
`;
