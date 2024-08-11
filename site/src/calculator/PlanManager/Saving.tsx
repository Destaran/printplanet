import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components/Button";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
  inputArray,
  outputArray,
  outputValues,
} from "redux/calculator/calculator.selector";
import styled from "styled-components";
import { Plan } from "utils/API/plan/Plan";
import { useAddPlan } from "utils/API/plan/useAddPlan";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div``;

export function Saving() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  const [name, setName] = useState("");
  const output = useSelector(outputValues);
  const planJson = JSON.stringify(output);
  const outputSummary = useSelector(outputArray);
  const outputJson = JSON.stringify(outputSummary);
  const inputSummary = useSelector(inputArray);
  const inputJson = JSON.stringify(inputSummary);

  const addPlanMutation = useAddPlan();
  const addPlan = addPlanMutation.mutate;

  const saveHandler = useCallback(() => {
    const plan: Plan = {
      id: uuidv4(),
      name,
      ownerId: user.sub ?? "",
      input: inputJson,
      output: outputJson,
      plan: planJson,
    };

    addPlan(plan);
  }, [name, addPlan]);

  function nameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  return (
    <Container>
      <input type="text" onChange={nameChangeHandler} name="plan-name" />
      <Button onClick={saveHandler}>Save</Button>
    </Container>
  );
}
