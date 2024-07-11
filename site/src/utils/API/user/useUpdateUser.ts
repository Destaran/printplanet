import { useCallback } from "react";
import { put } from "../API";
import { useMutation } from "@tanstack/react-query";
import { User } from "utils/types";

async function updateUser(user: User, id: string) {
  return await put<User>(`/user/${id}`, user);
}

export function useUpdateUser(id: string) {
  const updateCurrentUser = useCallback(
    async (user: User) => await updateUser(user, id),
    [id]
  );

  return useMutation({ mutationFn: updateCurrentUser });
}
