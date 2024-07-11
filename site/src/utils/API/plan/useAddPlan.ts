import { useMutation } from "@tanstack/react-query";
import { post } from "../API";
import { Plan } from "./Plan";

async function addPlan(plan: Plan) {
  return await post<Plan>("/plans", plan);
}

export function useAddPlan() {
  return useMutation({ mutationFn: addPlan });
}
