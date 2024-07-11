import { useCallback } from "react";
import { put } from "../API";
import { useMutation } from "@tanstack/react-query";
import { Plan } from "./Plan";

async function updatePlan(plan: Plan, id: string) {
  return await put<Plan>(`/plans/${id}`, plan);
}

export function useUpdatePlan(id: string) {
  const updateCurrentPlan = useCallback(
    async (plan: Plan) => await updatePlan(plan, id),
    [id]
  );

  return useMutation({ mutationFn: updateCurrentPlan });
}
