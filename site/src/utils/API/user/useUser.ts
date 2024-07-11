import { useCallback } from "react";
import { get } from "../API";
import { useQuery } from "@tanstack/react-query";
import { User } from "utils/types";

export async function getUser(id: string) {
  if (id === "") {
    throw new Error("User id is required");
  }
  return await get<User>(`/user/${id}`);
}

export function useUser(id: string) {
  const getCurrentUser = useCallback(async () => await getUser(id), [id]);

  return useQuery({ queryKey: ["user", id], queryFn: getCurrentUser });
}
