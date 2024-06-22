import { useMutation } from "@tanstack/react-query";
import { post } from "../API";

async function addUser(plan: any) {
  return await post<any>("/user", plan);
}

export function useAddUser() {
  return useMutation({ mutationFn: addUser });
}
