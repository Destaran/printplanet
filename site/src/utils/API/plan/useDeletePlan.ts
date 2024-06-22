import { useMutation, useQueryClient } from "@tanstack/react-query";
import { del } from "../API";

async function deletePlan(id: string) {
  return await del(`/plans/${id}`);
}

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}
