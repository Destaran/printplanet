import styled from "styled-components";
import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  width: 80%;
  max-width: 1088px;
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
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

  return <Container>{children}</Container>;
}
