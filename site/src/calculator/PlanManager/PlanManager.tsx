import styled from "styled-components";
import { Saving } from "./Saving";
import { Loading } from "./Loading";

const Container = styled.div``;

export function PlanManager() {
  return (
    <Container>
      <Saving />
      <Loading />
    </Container>
  );
}
