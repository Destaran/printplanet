import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { Plan } from "./Plan";

async function getPlans() {
  return await get<Plan>("/plans");
}

export function usePlans() {
  return useQuery({ queryKey: ["plans"], queryFn: getPlans });
}
