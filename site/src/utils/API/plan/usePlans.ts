import { useQuery } from "@tanstack/react-query";
import { get } from "../API";

async function getPlans() {
  return await get<any>("/plans");
}

export function usePlans() {
  return useQuery({ queryKey: ["plans"], queryFn: getPlans });
}
