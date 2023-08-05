import { v4 as uuidv4 } from "uuid";
import data from "../../src/utils/recipes/database.json";

export const recipes = data.recipes;
export const craftingMachines = data.craftingMachines;
export const modules = data.modules;

export const formatNumber = (number) => {
  if (typeof number !== "number") {
    return;
  }
  if (Number.isInteger(number)) {
    return number;
  } else if (number >= 100) {
    return Number(Math.ceil(number));
  } else if (number <= 0.09) {
    return Number(number.toFixed(2));
  } else {
    return Number(number.toFixed(1));
  }
};

export const getAllProducts = recipes.reduce((accumulator, obj) => {
  const { products } = obj;
  products.forEach((product) => {
    const { name } = product;
    const existingProduct = accumulator.find((p) => p.name === name);
    if (!existingProduct) {
      accumulator.push(product);
    }
  });
  return accumulator;
}, []);

export const getMachinesById = (id) => {
  const recipe = recipes.find((recipe) => recipe.name === id);
  const category = recipe.category;
  const machinesArray = [];
  craftingMachines.forEach((machine) => {
    if (machine.categories[category] === true) {
      machinesArray.push(machine);
    }
  });
  return machinesArray;
};

export const getModulesByRecipeId = (id) => {
  const modulesArray = [];
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

export const getNameById = (id) => {
  if (typeof id !== "string") {
    return;
  }
  const words = id.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const result = words.join(" ");
  return result;
};

export const getRecipeById = (id) =>
  recipes.find((recipe) => recipe.name === id);

export const getImageUrlById = (id) => {
  if (id) {
    return `./new-icons/${id}.png`;
  } else {
    return "";
  }
};

export const getRecipeCategory = (id) => {
  const item = recipes.find((item) => item.name === id);
  return item.category;
};

export const getIngredients = (id) => {
  const recipe = getRecipeById(id);
  if (recipe) {
    const array = [];
    recipe.ingredients.forEach((ingredient) => {
      const obj = {
        id: ingredient.name,
        uid: uuidv4(),
      };
      array.push(obj);
    });
    return array;
  } else {
    return [];
  }
};

export const getMachineObjectById = (id) => {
  return craftingMachines.find((item) => item.name === id);
};

export const checkIfMultipleRecipes = (id) => {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === id)
  );
  if (matchingObjects.length === 1) {
    return false;
  } else if (matchingObjects.length > 1) {
    return true;
  }
};

export const getRecipeByProduct = (id) => {
  if (checkIfMultipleRecipes(id)) {
    return;
  }
  return recipes.find((recipe) =>
    recipe.products.find((product) => product.name === id)
  );
};

export const getRecipes = (productId) => {
  const matchingObjects = recipes.filter((obj) =>
    obj.products.some((product) => product.name === productId)
  );
  if (matchingObjects.length === 1) {
    return matchingObjects[0];
  } else if (matchingObjects.length > 1) {
    return matchingObjects;
  }
};

const getModuleSpeedBonus = (id) => {
  if (!id) {
    return 0;
  }
  const module = modules.find((module) => id === module.name);
  if (module && module.effects.speed) {
    return module.effects.speed.bonus;
  }
  return 0;
};

const getModuleProdBonus = (id) => {
  if (!id) {
    return 0;
  }
  const module = modules.find((module) => id === module.name);
  if (module && module.effects.productivity) {
    return module.effects.productivity.bonus;
  }
  return 0;
};

const getBonusSpeed = (modules) => {
  return modules.reduce((sum, module) => {
    return sum + getModuleSpeedBonus(module);
  }, 0);
};

const getBonusProd = (modules) => {
  return modules.reduce((sum, module) => {
    return sum + getModuleProdBonus(module);
  }, 0);
};

export const getModdedMachineSpeed = (modules, beacons, craftingSpeed) => {
  const modulesBonus = getBonusSpeed(modules);
  const beaconsBonus = (getBonusSpeed(beacons.modules) * beacons.affecting) / 2;
  return craftingSpeed * (modulesBonus + beaconsBonus) + craftingSpeed;
};

export const getModdedMachineProd = (modules) => {
  return getBonusProd(modules);
};

export const summarizeInputs = (outputItem, inputArray) => {
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

export const getEmptyMachine = (id) => {
  const machine = getMachineObjectById(id);
  return {
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

export const checkIfDefault = (machineId, defaultMachines) => {
  const defMachinesArray = Object.values(defaultMachines);
  const existingItem = defMachinesArray.find(
    (machine) => machine.id === machineId
  );
  if (existingItem) {
    return true;
  } else {
    return false;
  }
};

const checkIfUseableModule = (module, recipeId) => {
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

export const checkModulesForBumping = (uid, machine, recipe) => {
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
export const summarizeMachines = (outputItem, machinesArray) => {
  if (outputItem.ingredients) {
    const existingItem = machinesArray.find(
      (machine) => machine.id === outputItem.machine.id
    );
    if (!existingItem) {
      const objToPush = {
        id: outputItem.machine.id,
        amount: Math.ceil(outputItem.machine.amount),
      };
      machinesArray.push(objToPush);
    } else {
      existingItem.amount += Math.ceil(outputItem.machine.amount);
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeMachines(ingredient, machinesArray);
    });
  }
};

export const summarizeBeacons = (outputItem, machinesArray) => {
  if (outputItem.ingredients) {
    const existingBeacon = machinesArray.find(
      (module) => module.id === "beacon"
    );
    if (!existingBeacon && outputItem.machine.beacons.required > 0) {
      const objToPush = {
        id: "beacon",
        amount: outputItem.machine.beacons.required,
      };
      machinesArray.push(objToPush);
    } else if (outputItem.machine.beacons.required > 0) {
      existingBeacon.amount += outputItem.machine.beacons.required;
    }
    outputItem.ingredients.forEach((ingredient) => {
      summarizeBeacons(ingredient, machinesArray);
    });
  }
};

export const countModules = ({ modules, beacons, amount }) => {
  const modulesAcc = {};
  const roundedMachineCount = Math.ceil(amount);
  modules.forEach((module) => {
    if (module.length > 0) {
      modulesAcc[module]
        ? (modulesAcc[module] += roundedMachineCount)
        : (modulesAcc[module] = roundedMachineCount);
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
};

export const summarizeModules = (outputItem, machinesArray) => {
  if (outputItem.ingredients) {
    const machineModules = countModules(outputItem.machine);
    Object.keys(machineModules).forEach((key) => {
      const existingModule = machinesArray.find((module) => module.id === key);
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
};

const getReqMachineCount = (
  craftingSpeed,
  productivity,
  amount,
  craftingTime,
  constant,
  recipeYield
) => {
  if (!constant) {
    return (
      (amount / recipeYield) *
      (craftingTime / craftingSpeed / (productivity + 1))
    );
  } else {
    return (
      (amount / recipeYield) *
      (craftingTime / craftingSpeed / (productivity + 1) + constant)
    );
  }
};

const getReqBeaconCount = (constant, additional, machineAmount) => {
  return (
    Number(constant) + Number(additional) * Number(Math.ceil(machineAmount))
  );
};

export const calculateTree = ({
  ingredients,
  recipe: recipeId,
  id,
  machine,
  amount,
}) => {
  if (ingredients && machine) {
    const recipe = getRecipeById(recipeId);
    const product = recipe.products.find((item) => item.name === id);
    machine.craftingSpeed = getModdedMachineSpeed(
      machine.modules,
      machine.beacons,
      machine.craftingSpeed
    );
    machine.productivity = getModdedMachineProd(machine.modules);
    machine.amount = getReqMachineCount(
      machine.craftingSpeed,
      machine.productivity,
      amount,
      recipe.energy,
      recipe.constant,
      product.amount
    );
    // refactor: make the beacons calculation below a function
    const beaconsCopy = structuredClone(machine.beacons);
    if (
      beaconsCopy.modules.some((module) => module.length > 0) &&
      beaconsCopy.affecting > 0
    ) {
      beaconsCopy.required = getReqBeaconCount(
        machine.beacons.constant,
        machine.beacons.additional,
        machine.amount
      );
    } else {
      beaconsCopy.required = 0;
    }
    machine.beacons = beaconsCopy;

    // refactor: make children amount calc a function
    ingredients.forEach((ingredient) => {
      const ingredientRecipe = recipe.ingredients.find(
        (item) => item.name === ingredient.id
      );
      if (ingredient.id !== "satellite") {
        ingredient.amount = Number(
          (ingredientRecipe.amount * (amount / (machine.productivity + 1))) /
            product.amount
        );
      } else {
        ingredient.amount = Number(
          (ingredientRecipe.amount * amount) / product.amount
        );
      }
      calculateTree(ingredient);
    });
  }
};

// Search for recipes producing product based on id
// Returns array of multiple ids or single id
export const lookUpProducers = (resultArray, outputItem, lookUpId) => {
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

export const getProducers = (output, id) => {
  const resultArray = [];
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

export const getDefaultMachine = (id, machines) => {
  const machinesArray = Object.values(machines);
  return machinesArray.find((category) => category.id === id);
};

export const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  for (let key of keys1) {
    if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

// Redux functions
export const extendElementByUid = (item, uid, recipe, machine) => {
  if (typeof item !== "object") {
    return;
  }

  if (item.uid === uid) {
    const newIngredients = getIngredients(recipe);
    if (newIngredients.length > 0) {
      item.ingredients = newIngredients;
      item.recipe = recipe;
      item.machine = { ...machine, uid: uuidv4() };
    }
  } else if (item.ingredients) {
    item.ingredients.forEach((object) => {
      extendElementByUid(object, uid, recipe, machine);
    });
  }
};

export const collapseElementByUid = (obj, uid) => {
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

export const collapseElementsById = (obj, id) => {
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

const getTreeUids = (outputItem, id, allUids) => {
  if (outputItem.id === id) {
    allUids.push(outputItem.uid);
  }
  if (outputItem.ingredients) {
    outputItem.ingredients.forEach((ingredient) => {
      getTreeUids(ingredient, id, allUids);
    });
  }
};

export const getAllUids = (output, id) => {
  const allUids = [];
  output.forEach((outputItem) => {
    getTreeUids(outputItem, id, allUids);
  });
  return allUids;
};

export const switchMachines = (outputItem, machine, updateId) => {
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

export const bumpProdModules = (outputItem, uid) => {
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
    }
  }
};
