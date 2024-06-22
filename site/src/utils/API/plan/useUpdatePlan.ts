import { useCallback } from "react";
import { put } from "../API";
import { useMutation } from "@tanstack/react-query";

async function updatePlan(plan: any, id: string) {
  return await put<any>(`/plans/${id}`, plan);
}

export function useUpdatePlan(id: string) {
  const updateCurrentPlan = useCallback(
    async (plan: any) => await updatePlan(plan, id),
    [id]
  );

  return useMutation({ mutationFn: updateCurrentPlan });
}
