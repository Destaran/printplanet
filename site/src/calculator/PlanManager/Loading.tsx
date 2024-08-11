import { Button } from "components/Button";
import styled from "styled-components";
import { PlanList } from "./PlanList";

const Container = styled.div``;

export function Loading() {
  function loadHandler() {
    console.log("Load");
  }
  return (
    <Container>
      <PlanList />
      <Button onClick={loadHandler}>Load</Button>
    </Container>
  );
}
