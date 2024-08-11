import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useMyPlans } from "utils/API/plan/useMyPlans";

const Container = styled.div``;

const PlanWrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
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
        <PlanWrapper key={plan.id}>
          <p>{plan.name}</p>
          <p>input: {plan.input}</p>
          <p>output: {plan.output}</p>
        </PlanWrapper>
      ))}
    </Container>
  );
}
