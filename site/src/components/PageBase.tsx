import styled from "styled-components";
import { ReactNode } from "react";
import { ppLightGrey } from "../utils/colors";

const Container = styled.div`
  background-color: ${ppLightGrey};
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  width: 65%;
  align-items: start;
  flex-grow: 1;
  padding: 20px;
`;

interface PageBaseProps {
  children?: ReactNode;
}

export function PageBase({ children }: PageBaseProps) {
  return <Container>{children}</Container>;
}
