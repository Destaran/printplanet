import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 0px auto;
  padding: 30px;
  width: 85%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

export const About = () => {
  return (
    <Container>
      <h1>About</h1>
    </Container>
  );
};
