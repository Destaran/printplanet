export interface Plan {
  id: string;
  plan: string;
  ownerId: string;
  name: string;
  output: string;
  input: string;
}

export type PlanInput = Omit<Plan, "id">;
