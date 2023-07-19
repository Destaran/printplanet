import styled from "styled-components";
import { WindowItem } from "../WindowItem/WindowItem.component";

const Container = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
  display: flex;
  justify-content: start;
  margin-bottom: 22.5px;
`;

const WindowContainer = styled.div`
  min-width: auto;
  height: auto;
  width: auto;
`;

const WindowOutter = styled.div`
  display: inline-flex;
  height: auto;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border: 1px black solid;
  background-color: #14213d;
  margin: 0;
  padding: 4px;
`;

const WindowInner = styled.div`
  display: grid;
  grid-template-columns: repeat(14, auto);
  border: 1px black solid;
  background-color: #313131;
  width: 100%;
  height: auto;
`;

const Title = styled.p`
  margin: 0;
`;

export const Window = ({ title, items, handleClick }) => {
  return (
    <Container>
      <WindowContainer>
        <Title>{title}</Title>
        <WindowOutter>
          <WindowInner>
            {items.map((item, idx) => {
              return (
                <WindowItem item={item} key={idx} handleClick={handleClick} />
              );
            })}
          </WindowInner>
        </WindowOutter>
      </WindowContainer>
    </Container>
  );
};