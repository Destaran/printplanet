import { useCallback } from "react";
import { get } from "../API";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "./Plan";

async function getMyPlans(ownerId: string) {
  if (ownerId === "") {
    throw new Error("ownerId is required");
  }
  return await get<Plan[]>(`/plans/my/${ownerId}`);
}

export function useMyPlans(ownerId: string) {
  const getPlans = useCallback(
    async () => await getMyPlans(ownerId),
    [ownerId]
  );

  return useQuery({ queryKey: ["plans", ownerId], queryFn: getPlans });
}
