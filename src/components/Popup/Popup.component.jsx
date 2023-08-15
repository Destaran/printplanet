import styled from "styled-components";
import { createPortal } from "react-dom";
import { ppBlue } from "../../utils/colors";

const PopupContainer = styled.div`
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

const Header = styled.div`
  margin: 0 0 16px 0;
`;

const Container = styled.div`
  background-color: white;
  min-width: 300px;
  width: auto;
  display: block;
  border: 2px solid ${ppBlue};
  padding: 15px;
  user-select: none;
`;

const PopupPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export const Popup = ({ children, title }) => {
  return (
    <PopupPortal>
      <PopupContainer>
        <Container>
          <Header>
            <u>{title}</u>
          </Header>
          {children}
        </Container>
      </PopupContainer>
    </PopupPortal>
  );
};
