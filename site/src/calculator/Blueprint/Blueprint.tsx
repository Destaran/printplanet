import styled from "styled-components";

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 500px;
`;

export function Blueprint() {
  return (
    <div>
      <StyledCanvas id="blueprint" />
    </div>
  );
}
