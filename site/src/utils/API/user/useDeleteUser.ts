import { useMutation, useQueryClient } from "@tanstack/react-query";
import { del } from "../API";

async function deleteUser(id: string) {
  return await del(`/user/${id}`);
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
