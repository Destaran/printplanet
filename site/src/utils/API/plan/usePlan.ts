import { useCallback } from "react";
import { get } from "../API";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "./Plan";

async function getPlan(id: string) {
  if (id === "") {
    throw new Error("Plan id is required");
  }
  return await get<Plan>(`/plans/${id}`);
}

export function usePlan(id: string) {
  const getCurrentPlan = useCallback(async () => await getPlan(id), [id]);

  return useQuery({ queryKey: ["plan", id], queryFn: getCurrentPlan });
}
