import styled from "styled-components";
import { Plan } from "utils/API/plan/Plan";
import { SummaryItem } from "utils/types";
import { ItemIcon } from "./ItemIcon";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { loadPlan } from "redux/calculator/calculator.slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 80px;
  border: 1px solid black;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p``;

interface Props {
  plan: Plan;
}

export function PlanSummary({ plan }: Props) {
  const dispatch = useDispatch();
  const output = JSON.parse(plan.output);

  const handleClick = useCallback(() => {
    const planOutput = JSON.parse(plan.plan);
    dispatch(loadPlan(planOutput));
  }, []);

  return (
    <Container onClick={handleClick}>
      <Title>{plan.name}</Title>
      <Wrapper>
        {output.map((item: SummaryItem) => {
          return <ItemIcon item={item} key={item.id} />;
        })}
      </Wrapper>
    </Container>
  );
}
