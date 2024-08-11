import { Button } from "components/Button";
import styled from "styled-components";
import { Saving } from "./Saving";

const Container = styled.div``;

export function PlanManager() {
  return (
    <Container>
      <Saving />
      <Button>Load</Button>
    </Container>
  );
}
