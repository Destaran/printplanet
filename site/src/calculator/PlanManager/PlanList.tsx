import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useMyPlans } from "utils/API/plan/useMyPlans";
import { PlanSummary } from "./PlanSummary";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

export function PlanList() {
  const { user } = useAuth0();

  if (!user || !user.sub) {
    return null;
  }

  const plansQuery = useMyPlans(user.sub);

  if (plansQuery.isLoading) {
    return <Container>Loading...</Container>;
  }

  if (plansQuery.isError) {
    return <Container>Error</Container>;
  }

  if (!plansQuery.data || plansQuery.data.length === 0) {
    return <Container>No plans found</Container>;
  }

  return (
    <Container>
      {plansQuery.data.map((plan) => (
        <PlanSummary plan={plan} key={plan.id} />
      ))}
    </Container>
  );
}
