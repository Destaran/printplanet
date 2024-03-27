import styled from "styled-components";
import { ReactNode } from "react";
import { ppLightGrey } from "../utils/colors";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";

const Container = styled.div`
  background-color: ${ppLightGrey};
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  width: 80%;
  align-items: start;
  flex-grow: 1;
  padding: 20px;
`;

interface PageBaseProps {
  children?: ReactNode;
}

export function PageBase({ children }: PageBaseProps) {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  return <Container>{children}</Container>;
}
