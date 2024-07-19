import data from "./recipes/database.json";

import {
  Recipe,
  Machine,
  Module,
  MachineCategory,
  MachineCategories,
  OutputItem,
  OwnMachine,
} from "./types";

export const recipes = data.recipes as Recipe[];
export const craftingMachines = data.craftingMachines as Machine[];
export const modules = data.modules as Module[];

export function getMachinesById(recipeId: string) {
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
}

export function getModulesByRecipeId(id: string) {
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
}

export function getNameById(id: string) {
  const words = id.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const result = words.join(" ");
  return result;
}

export function getRecipeById(id: string) {
  const recipe = recipes.find((recipe) => recipe.name === id);
  if (!recipe) {
    throw new Error("Could not find recipe by ID");
  }

  return recipe;
}

export function getImageUrlById(id: string) {
  if (id) {
    return `./new-icons/${id}.png`;
  } else {
    return "";
  }
}

function getMachineObjectById(id: string) {
  const machine = craftingMachines.find((item) => item.name === id);
  if (!machine) {
    throw new Error("Could not find machine object by ID");
  }
  return machine;
}

export function getMachineCategories(id: string) {
  return getMachineObjectById(id).categories;
}

export function checkIfMultipleRecipes(id: string): boolean {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === id)
  );
  if (matchingObjects.length < 1) {
    throw new Error("No recipes found for product");
  } else if (matchingObjects.length === 1) {
    return false;
  }
  return true;
}

export function getRecipeByProduct(id: string) {
  if (checkIfMultipleRecipes(id)) {
    return;
  }
  return recipes.find((recipe) =>
    recipe.products.find((product) => product.name === id)
  );
}

export function getRecipes(productId: string): Recipe[] {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === productId)
  );
  return matchingObjects;
}

export function getEmptyMachine(id: string) {
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
}

export function checkIfDefault(
  machineId: string,
  defaultMachines: Record<MachineCategory, OwnMachine>
) {
  const defMachinesArray = Object.values(defaultMachines);
  return defMachinesArray.some((machine) => machine.id === machineId);
}

function checkIfUseableModule(module: string, recipeId: string) {
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
}

export function checkModulesForBumping(
  uid: string,
  machine: OwnMachine,
  recipe: string
) {
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
}

// refactor: look into rounding

// Search for recipes producing product based on id
// Returns array of multiple ids or single id
function lookUpProducers(
  resultArray: string[],
  outputItem: OutputItem,
  lookUpId: string
) {
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
}

export function getProducers(output: OutputItem[], id: string) {
  const resultArray: string[] = [];
  output.forEach((element) => {
    lookUpProducers(resultArray, element, id);
  });
  return resultArray;
}

export function getModules() {
  const modulNames = [""];
  modules.forEach((module) => {
    modulNames.push(module.name);
  });
  return modulNames;
}

export function getBeaconModules() {
  const moduleNames = getModules();
  return moduleNames.filter(
    (moduleName) => !moduleName.includes("productivity")
  );
}

export function getDefaultMachine(
  id: string,
  machines: Record<string, OwnMachine>
) {
  const machinesArray = Object.values(machines);
  return <OwnMachine>machinesArray.find((category) => category.id === id);
}

export function compareCategories(
  original: MachineCategories,
  compared: MachineCategories
) {
  return original.every((og: MachineCategory) => compared.includes(og));
}
