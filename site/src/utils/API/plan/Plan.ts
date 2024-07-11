import { OutputItem } from "utils/types";

export interface Plan {
  id: string;
  name: string;
  ownerId: string;
  output: string[];
  input: string[];
  plan: OutputItem[];
}
