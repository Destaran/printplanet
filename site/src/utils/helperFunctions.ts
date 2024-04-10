import data from "./recipes/database.json";
import { v4 as uuidv4 } from "uuid";

import {
  Recipe,
  Machine,
  Module,
  RecipeProduct,
  MachineCategory,
  MachineCategories,
  ReduxIngredient,
  OutputItem,
  OwnMachine,
} from "./types";

export const recipes = data.recipes as Recipe[];
export const craftingMachines = data.craftingMachines as Machine[];
export const modules = data.modules as Module[];

export const getAllProducts = () =>
  recipes.reduce<RecipeProduct[]>((accumulator, object) => {
    const { products } = object;
    products.forEach((product) => {
      const existingProduct = accumulator.find((p) => p.name === product.name);
      if (!existingProduct) {
        accumulator.push(product);
      }
    });
    return accumulator;
  }, []);

export const getMachinesById = (recipeId: string) => {
  const recipe = recipes.find((recipe) => recipe.name === recipeId);
  if (!recipe) {
    throw new Error("Could not find machine by recipe ID");
  }
  const category: MachineCategory = recipe.category;
  const machinesArray: Machine[] = [];
  craftingMachines.forEach((machine) => {
    if (machine.categories.includes(category)) {
      machinesArray.push(machine);
    }
  });
  return machinesArray;
};

export const getModulesByRecipeId = (id: string) => {
  const modulesArray: Module[] = [];
  modules.forEach((module) => {
    if (module.limitations.length < 1) {
      modulesArray.push(module);
    } else {
      const contains = module.limitations.find(
        (limitation) => limitation === id
      );
      if (contains) {
        modulesArray.push(module);
      }
    }
  });
  return modulesArray;
};

export const getNameById = (id: string) => {
  const words = id.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const result = words.join(" ");
  return result;
};

export const getRecipeById = (id: string) => {
  const recipe = recipes.find((recipe) => recipe.name === id);
  if (!recipe) {
    throw new Error("Could not find recipe by ID");
  }

  return recipe;
};

export const getImageUrlById = (id: string) => {
  if (id) {
    return `./new-icons/${id}.png`;
  } else {
    return "";
  }
};

export const getRecipeCategory = (id: string) => {
  const item = recipes.find((item) => item.name === id);
  if (!item) {
    throw new Error("Could not find recipe by ID");
  }
  return item.category;
};

export const getIngredients = (id: string) => {
  try {
    const recipe = getRecipeById(id);
    const array: ReduxIngredient[] = [];
    recipe.ingredients.forEach((ingredient) => {
      const obj = {
        id: ingredient.name,
        uid: uuidv4(),
      };
      array.push(obj);
    });
    return array;
  } catch {
    return [];
  }
};

export const getMachineObjectById = (id: string) => {
  const machine = craftingMachines.find((item) => item.name === id);
  if (!machine) {
    throw new Error("Could not find machine object by ID");
  }
  return machine;
};

export const getMachineCategories = (id: string) =>
  getMachineObjectById(id).categories;

export const checkIfMultipleRecipes = (id: string) => {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === id)
  );
  if (matchingObjects.length === 1) {
    return false;
  } else if (matchingObjects.length > 1) {
    return true;
  }
};

export const getRecipeByProduct = (id: string) => {
  if (checkIfMultipleRecipes(id)) {
    return;
  }
  return recipes.find((recipe) =>
    recipe.products.find((product) => product.name === id)
  );
};

export const getRecipes = (productId: string) => {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === productId)
  );
  if (matchingObjects.length === 1) {
    return matchingObjects[0];
  } else if (matchingObjects.length > 1) {
    return matchingObjects;
  }
};

export const getEmptyMachine = (id: string) => {
  const machine = getMachineObjectById(id);
  return <OwnMachine>{
    id: id,
    craftingSpeed: machine.craftingSpeed,
    productivity: 0,
    beacons: {
      affecting: 0,
      additional: 0,
      constant: 0,
      modules: ["", ""],
    },
    modules: new Array(machine.moduleSlots).fill(""),
  };
};

export const checkIfDefault = (
  machineId: string,
  defaultMachines: Record<MachineCategory, OwnMachine>
) => {
  const defMachinesArray = Object.values(defaultMachines);
  return defMachinesArray.some((machine) => machine.id === machineId);
};

const checkIfUseableModule = (module: string, recipeId: string) => {
  if (module) {
    let isUseable = false;
    const useableModules = getModulesByRecipeId(recipeId);
    useableModules.forEach((useable) => {
      if (useable.name == module) {
        isUseable = true;
      }
    });
    return isUseable;
  } else {
    return true;
  }
};

export const checkModulesForBumping = (
  uid: string,
  machine: OwnMachine,
  recipe: string
) => {
  if (uid && machine) {
    const { modules: machineModules } = machine;
    let shouldBump = false;
    machineModules.forEach((module) => {
      if (
        module.includes("productivity") &&
        !checkIfUseableModule(module, recipe)
      ) {
        shouldBump = true;
      }
    });
    return shouldBump;
  }
};

// refactor: look into rounding

// Search for recipes producing product based on id
// Returns array of multiple ids or single id
export const lookUpProducers = (
  resultArray: string[],
  outputItem: OutputItem,
  lookUpId: string
) => {
  if (outputItem.ingredients) {
    const existingItem = resultArray.find((item) => item === outputItem.id);
    outputItem.ingredients.forEach((ingredient) => {
      if (!existingItem && ingredient.id === lookUpId) {
        resultArray.push(outputItem.id);
      }
      if (ingredient.ingredients) {
        lookUpProducers(resultArray, ingredient, lookUpId);
      }
    });
  }
};

export const getProducers = (output: OutputItem[], id: string) => {
  const resultArray: string[] = [];
  output.forEach((element) => {
    lookUpProducers(resultArray, element, id);
  });
  return resultArray;
};

export const getModules = () => {
  const modulNames = [""];
  modules.forEach((module) => {
    modulNames.push(module.name);
  });
  return modulNames;
};

export const getBeaconModules = () => {
  const moduleNames = getModules();
  return moduleNames.filter(
    (moduleName) => !moduleName.includes("productivity")
  );
};

export const getDefaultMachine = (
  id: string,
  machines: Record<string, OwnMachine>
) => {
  const machinesArray = Object.values(machines);
  return <OwnMachine>machinesArray.find((category) => category.id === id);
};

export const compareCategories = (
  original: MachineCategories,
  compared: MachineCategories
) => {
  return original.every((og: MachineCategory) => compared.includes(og));
};
