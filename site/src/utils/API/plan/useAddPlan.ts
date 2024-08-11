import { useMutation } from "@tanstack/react-query";
import { post } from "../API";
import { PlanInput } from "./Plan";

async function addPlan(plan: PlanInput) {
  return await post<PlanInput>("/plans", plan);
}

export function useAddPlan() {
  return useMutation({ mutationFn: addPlan });
}
