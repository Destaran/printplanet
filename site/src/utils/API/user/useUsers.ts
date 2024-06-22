import { useQuery } from "@tanstack/react-query";
import { get } from "../API";

async function getUsers() {
  return await get<any>("/user");
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
}
