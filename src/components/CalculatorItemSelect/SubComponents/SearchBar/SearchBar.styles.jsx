import styled from "styled-components";

const ppBlue = "#14213d";

export const SearchBarContainer = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

export const CurrentItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
  height: 30px;
  background-color: ${ppBlue};
  p {
    margin: 0;
    color: #f4f1de;
    font-size: 16px;
  }
  img {
    height: 24px;
    width: auto;
    margin: 0 5px 0 5px;
    background-color: white;
    border: 2px solid black;
  }
`;
