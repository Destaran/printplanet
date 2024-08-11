import styled from "styled-components";
import { Plan } from "utils/API/plan/Plan";
import { SummaryItem } from "utils/types";
import { ItemIcon } from "./ItemIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.p``;

interface Props {
  plan: Plan;
}

export function PlanSummary({ plan }: Props) {
  const output = JSON.parse(plan.output);

  return (
    <Container>
      <Title>{plan.name}</Title>
      <Wrapper>
        {output.map((item: SummaryItem) => {
          return <ItemIcon item={item} />;
        })}
      </Wrapper>
    </Container>
  );
}
