import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { User } from "utils/types";

async function getUsers() {
  return await get<User>("/user");
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
}
