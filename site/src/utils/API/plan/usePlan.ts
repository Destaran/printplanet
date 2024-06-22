import { useCallback } from "react";
import { get } from "../API";
import { useQuery } from "@tanstack/react-query";

async function getPlan(id: string) {
  if (id === "") {
    throw new Error("Plan id is required");
  }
  return await get<any>(`/plans/${id}`);
}

export function usePlan(id: string) {
  const getCurrentPlan = useCallback(async () => await getPlan(id), [id]);

  return useQuery({ queryKey: ["plan", id], queryFn: getCurrentPlan });
}
