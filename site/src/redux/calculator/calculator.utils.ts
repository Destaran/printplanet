import { getIngredients, getRecipeById, modules } from "utils/helperFunctions";
import {
  Beacons,
  CalculatedItem,
  CalculatedMachine,
  OutputItem,
  OwnMachine,
  SummaryItem,
} from "utils/types";

export function extendElementByUid(
  item: OutputItem,
  uid: string,
  recipe: string,
  machine: OwnMachine
) {
  if (typeof item !== "object") {
    return;
  }

  if (item.uid === uid) {
    const newIngredients = getIngredients(recipe);
    if (newIngredients.length > 0) {
      item.ingredients = newIngredients.map((ingredient) => ({
        ...ingredient,
        // refactor: should not get amount: 0
        amount: 0,
      }));
      item.recipe = recipe;
      item.machine = { ...machine };
    }
  } else if (item.ingredients) {
    item.ingredients.forEach((object) => {
      extendElementByUid(object, uid, recipe, machine);
    });
  }
}

export function collapseElementByUid(obj: OutputItem, uid: string) {
  if (obj.uid === uid) {
    delete obj.ingredients;
    delete obj.recipe;
    delete obj.machine;
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      collapseElementByUid(object, uid);
    });
  }
}

export function collapseElementsById(obj: OutputItem, id: string) {
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
}

function getTreeUids(outputItem: OutputItem, id: string, allUids: string[]) {
  if (outputItem.id === id) {
    allUids.push(outputItem.uid);
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      getTreeUids(ingredient, id, allUids);
    });
  }
}

export function getAllUids(output: OutputItem[], id: string) {
  const allUids: string[] = [];
  output.forEach((outputItem) => {
    getTreeUids(outputItem, id, allUids);
  });
  return allUids;
}

export function switchMachines(
  outputItem: OutputItem,
  machine: OwnMachine,
  updateId: string
) {
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
}

export function switchMachine(
  outputItem: OutputItem,
  machine: OwnMachine,
  uid: string
) {
  if (outputItem.uid === uid) {
    outputItem.machine = structuredClone(machine);
    return;
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      switchMachine(ingredient, machine, uid);
    });
  }
}

export function bumpProdModules(outputItem: OutputItem, uid: string) {
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
}

export function calculateTree(item: OutputItem): CalculatedItem {
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
}

function getModuleSpeedBonus(id: string) {
  const module = modules.find((module) => id === module.name);
  if (!module || !module.effects.speed) {
    return 0;
  }
  return module.effects.speed.bonus;
}

function getModuleProdBonus(id: string) {
  const module = modules.find((module) => id === module.name);
  if (!module || !module.effects.productivity) {
    return 0;
  }
  return module.effects.productivity.bonus;
}

function getBonusSpeed(modules: string[]) {
  return modules.reduce((sum, module) => {
    return sum + getModuleSpeedBonus(module);
  }, 0);
}

function getBonusProd(modules: string[]) {
  return modules.reduce((sum, module) => {
    return sum + getModuleProdBonus(module);
  }, 0);
}

function getModdedMachineSpeed(
  modules: string[],
  beacons: Beacons,
  craftingSpeed: number
) {
  const modulesBonus = getBonusSpeed(modules);
  const beaconsBonus = (getBonusSpeed(beacons.modules) * beacons.affecting) / 2;
  return craftingSpeed * (modulesBonus + beaconsBonus) + craftingSpeed;
}

function getModdedMachineProd(modules: string[]) {
  return getBonusProd(modules);
}

function getReqMachineCount(
  craftingSpeed: number,
  productivity: number,
  amount: number,
  craftingTime: number,
  constant = 0,
  recipeYield: number,
  probability: number
) {
  return (
    (amount / recipeYield / probability) *
    (craftingTime / craftingSpeed / (productivity + 1) + constant)
  );
}

function getReqBeaconCount(
  constant: number,
  additional: number,
  machineAmount: number
) {
  return constant + additional * Math.ceil(machineAmount);
}

export function summarizeMachines(
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) {
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
      } else if (existingItem.amount) {
        existingItem.amount += Math.ceil(machine.amount);
      }
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeMachines(ingredient, machinesArray);
    });
  }
}

export function summarizeBeacons(
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) {
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
      } else if (existingBeacon.amount) {
        existingBeacon.amount += machine.beacons.required;
      }
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeBeacons(ingredient, machinesArray);
    });
  }
}

export function summarizeInputs(
  outputItem: OutputItem,
  inputArray: SummaryItem[]
) {
  if (!outputItem.ingredients) {
    const existingItem = inputArray.find((item) => item.id === outputItem.id);
    if (!existingItem) {
      const objToPush = {
        id: outputItem.id,
        amount: outputItem.amount,
      };
      inputArray.push(objToPush);
    } else if (existingItem.amount && outputItem.amount) {
      existingItem.amount += outputItem.amount;
    }
  } else {
    outputItem.ingredients.forEach((ingredient) => {
      summarizeInputs(ingredient, inputArray);
    });
  }
}

export function summarizeModules(
  outputItem: OutputItem,
  machinesArray: SummaryItem[]
) {
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
        } else if (existingModule.amount) {
          existingModule.amount += machineModules[key];
        }
      });
      outputItem.ingredients.forEach((ingredient) => {
        summarizeModules(ingredient, machinesArray);
      });
    }
  }
}

function countModules({ modules, beacons, amount }: OwnMachine) {
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
}
