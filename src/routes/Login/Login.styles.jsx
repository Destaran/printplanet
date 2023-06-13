import styled from "styled-components";

export const SignUpContainer = styled.div`
  background-color: #f1f1f1;
  font-size: 16px;
  margin: 40px auto;
  padding: 0;
  width: 300px;
  display: flex;
  justify-content: center;
  border: 1px black solid;
  border-radius: 10px;

  span {
    color: black;
    font-weight: 600;

    &:hover {
      cursor: pointer;
      color: orange;
    }
  }
`;
