import { useCallback } from "react";
import { put } from "../API";
import { useMutation } from "@tanstack/react-query";

async function updateUser(user: any, id: string) {
  return await put<any>(`/user/${id}`, user);
}

export function useUpdateUser(id: string) {
  const updateCurrentUser = useCallback(
    async (user: any) => await updateUser(user, id),
    [id]
  );

  return useMutation({ mutationFn: updateCurrentUser });
}
