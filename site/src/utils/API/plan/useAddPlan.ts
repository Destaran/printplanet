import { useMutation } from "@tanstack/react-query";
import { post } from "../API";

async function addPlan(plan: any) {
  return await post<any>("/plans", plan);
}

export function useAddPlan() {
  return useMutation({ mutationFn: addPlan });
}
