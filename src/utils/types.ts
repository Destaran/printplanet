export interface RecipeIngredient {
  type: string;
  amount: number;
  name: string;
}

export interface RecipeProduct {
  type: string;
  name: string;
  probability: number;
  amount: number;
}

export interface Recipe {
  name: string;
  category: MachineCategory;
  ingredients: RecipeIngredient[];
  products: RecipeProduct[];
  energy: number;
  constant?: number;
}

export type MachineCategory =
  | "crafting"
  | "chemistry"
  | "crafting-with-fluid"
  | "smelting"
  | "advanced-crafting"
  | "centrifuging"
  | "rocket-building"
  | "oil-processing"
  | "basic-crafting";
export type MachineCategories = MachineCategory[];

export interface Machine {
  name: string;
  categories: MachineCategories;
  craftingSpeed: number;
  ingredientCount: number;
  moduleSlots: number;
}

export interface ModuleEffects {
  speed?: { bonus: number };
  productivity?: { bonus: number };
  consumption?: { bonus: number };
  pollution?: { bonus: number };
}

export interface Module {
  name: string;
  effects: ModuleEffects;
  category: string;
  tier: number;
  limitations: string[];
}

export interface OutputItem {
  id: string;
  amount: number;
  uid: string;
  recipe?: string;
  ingredients?: OutputItem[];
  machine?: OwnMachine;
}

export type ReduxIngredient = Pick<OutputItem, "id" | "uid">;
export type SummaryItem = Pick<OutputItem, "id" | "amount">;

export interface Beacons {
  modules: string[];
  affecting: number;
  required: number;
  additional: number;
  constant: number;
}

export interface OwnMachine {
  id: string;
  amount?: number;
  modules: string[];
  beacons: Beacons;
  craftingSpeed: number;
  productivity: number;
}
