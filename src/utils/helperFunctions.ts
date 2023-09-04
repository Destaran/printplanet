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
  Beacons,
  OutputItem,
  SummaryItem,
  OwnMachine,
  CalculatedItem,
  CalculatedMachine,
} from "./types";

export const recipes = data.recipes as Recipe[];
export const craftingMachines = data.craftingMachines as Machine[];
export const modules = data.modules as Module[];

const spaceNumber = (numberString: string, insertIndex: number) => {
  const charArray = Array.from(numberString);
  while (insertIndex > 0) {
    charArray.splice(insertIndex, 0, " ");
    insertIndex -= 3;
  }
  const formattedNumber = charArray.join("");
  return formattedNumber;
};

// refactor
export const formatNumber = (number: number) => {
  let numberString;
  let insertIndex;
  if (number < 0.001) {
    return number.toFixed(4).toString();
  } else if (number < 0.01) {
    return number.toFixed(3).toString();
  } else if (number < 0.1) {
    return number.toFixed(2).toString();
  } else if (number < 100 && !number.toFixed(1).endsWith("0")) {
    return number.toFixed(1).toString();
  } else if (number < 10000) {
    numberString = Math.ceil(number).toString();
    insertIndex = numberString.length - 3;
  } else if (number < 100000) {
    if (!(number / 10).toFixed(1).endsWith("0")) {
      numberString = (Math.ceil(number / 10) / 100).toString().concat("k");
      insertIndex = numberString.length - 6;
    } else if (!(number / 1000).toFixed(2).endsWith("0")) {
      numberString = (number / 1000).toFixed(2).toString().concat("k");
      insertIndex = numberString.length - 6;
    } else if (!(number / 1000).toFixed(1).endsWith("0")) {
      numberString = (number / 1000).toFixed(1).toString().concat("k");
      insertIndex = numberString.length - 5;
    } else {
      numberString = Math.ceil(number / 1000)
        .toString()
        .concat("k");
      insertIndex = numberString.length - 4;
    }
  } else if (number < 1000000) {
    numberString = Math.ceil(number / 1000)
      .toString()
      .concat("k");
    insertIndex = numberString.length - 4;
  } else if (number < 100000000) {
    if (!(number / 10).toFixed(1).endsWith("0")) {
      numberString = (Math.ceil(number / 10) / 100000)
        .toFixed(2)
        .toString()
        .concat("M");
      insertIndex = numberString.length - 6;
    } else if (!(number / 1000000).toFixed(2).endsWith("0")) {
      numberString = (number / 1000000).toFixed(2).toString().concat("M");
      insertIndex = numberString.length - 6;
    } else if (!(number / 1000000).toFixed(1).endsWith("0")) {
      numberString = (number / 1000000).toFixed(1).toString().concat("M");
      insertIndex = numberString.length - 5;
    } else {
      numberString = Math.ceil(number / 1000000)
        .toString()
        .concat("M");
      insertIndex = numberString.length - 4;
    }
  } else if (number < 1000000000) {
    numberString = Math.ceil(number / 1000000)
      .toString()
      .concat("M");
    insertIndex = numberString.length - 4;
  } else {
    numberString = (number / 1000000000).toFixed(2).toString().concat("B");
    insertIndex = numberString.length - 7;
  }
  return spaceNumber(numberString, insertIndex);
};

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

const getModuleSpeedBonus = (id: string) => {
  const module = modules.find((module) => id === module.name);
  if (!module || !module.effects.speed) {
    return 0;
  }
  return module.effects.speed.bonus;
};

const getModuleProdBonus = (id: string) => {
  const module = modules.find((module) => id === module.name);
  if (!module || !module.effects.productivity) {
    return 0;
  }
  return module.effects.productivity.bonus;
};

const getBonusSpeed = (modules: string[]) => {
  return modules.reduce((sum, module) => {
    return sum + getModuleSpeedBonus(module);
  }, 0);
};

const getBonusProd = (modules: string[]) => {
  return modules.reduce((sum, module) => {
    return sum + getModuleProdBonus(module);
  }, 0);
};

const getModdedMachineSpeed = (
  modules: string[],
  beacons: Beacons,
  craftingSpeed: number
) => {
  const modulesBonus = getBonusSpeed(modules);
  const beaconsBonus = (getBonusSpeed(beacons.modules) * beacons.affecting) / 2;
  return craftingSpeed * (modulesBonus + beaconsBonus) + craftingSpeed;
};

const getModdedMachineProd = (modules: string[]) => {
  return getBonusProd(modules);
};

export const summarizeInputs = (
  outputItem: OutputItem,
  inputArray: SummaryItem[]
) => {
  if (!outputItem.ingredients) {
    const existingItem = inputArray.find((item) => item.id === outputItem.id);
    if (!existingItem) {
      const objToPush = {
        id: outputItem.id,
        amount: outputItem.amount,
      };
      inputArray.push(objToPush);
    } else {
      existingItem.amount += outputItem.amount;
    }
  } else {
    outputItem.ingredients.forEach((ingredient) => {
      summarizeInputs(ingredient, inputArray);
    });
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
export const summarizeMachines = (
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) => {
  const machine = outputItem.machine;
  if (outputItem.ingredients && machine) {
    const existingItem = machinesArray.find(
      (existingMachine) => existingMachine.id === machine.id
    );
    if (machine.amount) {
      if (!existingItem) {
        const objToPush = {
          id: machine.id,
          amount: Math.ceil(machine.amount),
        };
        machinesArray.push(objToPush);
      } else {
        existingItem.amount += Math.ceil(machine.amount);
      }
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeMachines(ingredient, machinesArray);
    });
  }
};

export const summarizeBeacons = (
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) => {
  const machine = outputItem.machine;
  if (outputItem.ingredients && machine) {
    const existingBeacon = machinesArray.find(
      (module) => module.id === "beacon"
    );
    if (machine.beacons.required > 0) {
      if (!existingBeacon) {
        const objToPush = {
          id: "beacon",
          amount: machine.beacons.required,
        };
        machinesArray.push(objToPush);
      } else {
        existingBeacon.amount += machine.beacons.required;
      }
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeBeacons(ingredient, machinesArray);
    });
  }
};

export const countModules = ({ modules, beacons, amount }: OwnMachine) => {
  if (amount) {
    const ceiledAmount = Math.ceil(amount);
    const modulesAcc: Record<string, number> = {};
    modules.forEach((module) => {
      if (module.length > 0) {
        modulesAcc[module]
          ? (modulesAcc[module] += ceiledAmount)
          : (modulesAcc[module] = ceiledAmount);
      }
    });
    if (beacons.required > 0) {
      beacons.modules.forEach((module) => {
        if (module.length > 0) {
          modulesAcc[module]
            ? (modulesAcc[module] += beacons.required)
            : (modulesAcc[module] = beacons.required);
        }
      });
    }

    return modulesAcc;
  }
};

export const summarizeModules = (
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) => {
  const machine = outputItem.machine;
  if (outputItem.ingredients && machine) {
    const machineModules = countModules(machine);
    if (machineModules) {
      Object.keys(machineModules).forEach((key) => {
        const existingModule = machinesArray.find(
          (module) => module.id === key
        );
        if (!existingModule) {
          const objToPush = {
            id: key,
            amount: machineModules[key],
          };
          machinesArray.push(objToPush);
        } else {
          existingModule.amount += machineModules[key];
        }
      });
      outputItem.ingredients.forEach((ingredient) => {
        summarizeModules(ingredient, machinesArray);
      });
    }
  }
};

const getReqMachineCount = (
  craftingSpeed: number,
  productivity: number,
  amount: number,
  craftingTime: number,
  constant = 0,
  recipeYield: number,
  probability: number
) => {
  return (
    (amount / recipeYield / probability) *
    (craftingTime / craftingSpeed / (productivity + 1) + constant)
  );
};

const getReqBeaconCount = (
  constant: number,
  additional: number,
  machineAmount: number
) => {
  return constant + additional * Math.ceil(machineAmount);
};

export const calculateTree = (item: OutputItem): CalculatedItem => {
  const { ingredients, recipe: recipeId, id, uid, machine, amount } = item;

  if (!ingredients || !machine || !recipeId) {
    return {
      ...structuredClone(item),
      recipe: undefined,
      ingredients: undefined,
      machine: undefined,
    };
  }

  const recipe = getRecipeById(recipeId);
  const product = recipe.products.find((item) => item.name === id);

  if (!product) {
    throw new Error("Could not find product by ID");
  }

  const craftingSpeed = getModdedMachineSpeed(
    machine.modules,
    machine.beacons,
    machine.craftingSpeed
  );
  const productivity = getModdedMachineProd(machine.modules);

  const machineAmount = getReqMachineCount(
    craftingSpeed,
    productivity,
    amount,
    recipe.energy,
    recipe.constant,
    product.amount,
    product.probability
  );
  // refactor: make the beacons calculation below a function
  const beacons = structuredClone(machine.beacons);
  if (
    beacons.modules.some((module) => module.length > 0) &&
    beacons.affecting > 0
  ) {
    beacons.required = getReqBeaconCount(
      machine.beacons.constant,
      machine.beacons.additional,
      machineAmount
    );
  } else {
    beacons.required = 0;
  }

  const newIngredients = ingredients.map((ingredient) => {
    const newIngredient = structuredClone(ingredient);
    const ingredientRecipe = recipe.ingredients.find(
      (item) => item.name === newIngredient.id
    );

    if (!ingredientRecipe) {
      throw new Error("Could not find ingredient recipe by ID");
    }

    if (newIngredient.id === "satellite") {
      newIngredient.amount = Number(
        (ingredientRecipe.amount * amount) /
          product.amount /
          product.probability
      );
    } else {
      newIngredient.amount = Number(
        (ingredientRecipe.amount * (amount / (productivity + 1))) /
          product.amount /
          product.probability
      );
    }

    return calculateTree(newIngredient);
  });

  const calculatedMachine: CalculatedMachine = {
    ...structuredClone(machine),
    amount: machineAmount,
    craftingSpeed,
    productivity,
    beacons,
  };

  return {
    ingredients: newIngredients,
    recipe: recipeId,
    id,
    uid,
    machine: calculatedMachine,
    amount,
  };
};

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

// Redux functions
export const extendElementByUid = (
  item: OutputItem,
  uid: string,
  recipe: string,
  machine: OwnMachine
) => {
  if (typeof item !== "object") {
    return;
  }

  if (item.uid === uid) {
    const newIngredients = getIngredients(recipe);
    if (newIngredients.length > 0) {
      item.ingredients = newIngredients.map((ingredient) => ({
        ...ingredient,
      }));
      item.recipe = recipe;
      item.machine = { ...machine };
    }
  } else if (item.ingredients) {
    item.ingredients.forEach((object) => {
      extendElementByUid(object, uid, recipe, machine);
    });
  }
};

export const collapseElementByUid = (obj: OutputItem, uid: string) => {
  if (obj.uid === uid) {
    delete obj.ingredients;
    delete obj.recipe;
    delete obj.machine;
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      collapseElementByUid(object, uid);
    });
  }
};

export const collapseElementsById = (obj: OutputItem, id: string) => {
  if (typeof obj !== "object") {
    return;
  }
  if (obj.id === id) {
    delete obj.ingredients;
    delete obj.recipe;
    delete obj.machine;
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      collapseElementsById(object, id);
    });
  }
};

const getTreeUids = (outputItem: OutputItem, id: string, allUids: string[]) => {
  if (outputItem.id === id) {
    allUids.push(outputItem.uid);
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      getTreeUids(ingredient, id, allUids);
    });
  }
};

export const getAllUids = (output: OutputItem[], id: string) => {
  const allUids: string[] = [];
  output.forEach((outputItem) => {
    getTreeUids(outputItem, id, allUids);
  });
  return allUids;
};

export const switchMachines = (
  outputItem: OutputItem,
  machine: OwnMachine,
  updateId: string
) => {
  if (outputItem.machine) {
    if (outputItem.machine.id === updateId) {
      outputItem.machine = structuredClone(machine);
    }
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      switchMachines(ingredient, machine, updateId);
    });
  }
};

export const switchMachine = (
  outputItem: OutputItem,
  machine: OwnMachine,
  uid: string
) => {
  if (outputItem.uid === uid) {
    outputItem.machine = structuredClone(machine);
    return;
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      switchMachine(ingredient, machine, uid);
    });
  }
};

export const bumpProdModules = (outputItem: OutputItem, uid: string) => {
  if (outputItem.machine) {
    if (outputItem.uid === uid) {
      const newModules = outputItem.machine.modules.map((module) => {
        if (module.includes("productivity")) {
          const words = module.split("-");
          words[0] = "speed";
          const word = words.join("-");
          return word;
        } else {
          return module;
        }
      });
      outputItem.machine.modules = newModules;
    } else {
      outputItem.ingredients?.forEach((ingredient) => {
        bumpProdModules(ingredient, uid);
      });
    }
  }
};
