import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { ppBlue } from "../../utils/colors";
import { ReactNode } from "react";

const PopupContainerAnimation = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 100;
}
`;

const ContainerAnimation = keyframes`
from {
  opacity: 0;
  scale: 0;
}

to {
  opacity: 100;
  scale: 1;
}
`;

const PopupContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  animation: ${PopupContainerAnimation} 200ms ease-out;
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
  animation: ${ContainerAnimation} 200ms ease-out;
`;

interface PortalProps {
  children: ReactNode;
}

interface PopupProps {
  children: ReactNode;
  title: string;
}

const PopupPortal = ({ children }: PortalProps) => {
  return createPortal(children, document.body);
};

export const Popup = ({ children, title }: PopupProps) => {
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
