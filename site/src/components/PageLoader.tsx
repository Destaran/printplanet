import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 150px;
`;

const Loader = styled.div`
  width: 6vw;
  height: 6vw;
  border: 3px solid #14213d;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  ::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 7vw;
    height: 7vw;
    border-radius: 50%;
    border: 3px solid;
    border-color: orange transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function PageLoader() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}
