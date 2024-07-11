import { useMutation } from "@tanstack/react-query";
import { post } from "../API";
import { User } from "utils/types";

async function addUser(plan: User) {
  return await post<User>("/user", plan);
}

export function useAddUser() {
  return useMutation({ mutationFn: addUser });
}
