import { v4 as uuidv4 } from "uuid";

// All vanilla Factorio data
import newData from "../../src/utils/recipes/database.json";
const database = Object.values(newData);
const newItems = database[0];
export const machines = database[1];
export const modules = database[2];

// All products array for SearchBar
export const allProducts = newItems.reduce((accumulator, obj) => {
  const { products } = obj;

  products.forEach((product) => {
    const { name } = product;

    // Check if the product already exists in the accumulator array
    const existingProduct = accumulator.find((p) => p.name === name);

    // If the product doesn't exist, add it to the accumulator
    if (!existingProduct) {
      accumulator.push(product);
    }
  });

  return accumulator;
}, []);

// Check if selected product has more than one recipes that can produce it
export const checkIfMultipleRecipes = (productName) => {
  const matchingObjects = newItems.filter((obj) => {
    return obj.products.some((product) => product.name === productName);
  });
  if (matchingObjects.length === 1) {
    return matchingObjects[0];
  } else if (matchingObjects.length > 1) {
    return matchingObjects;
  }
};

// Return available machines by recipe
export const returnMachinesById = (name) => {
  const recipe = newItems.find((recipe) => recipe.name === name);
  const category = recipe.category;
  const machinesArray = [];
  machines.forEach((machine) => {
    if (machine.categories[category] === true) {
      machinesArray.push(machine);
    }
  });
  return machinesArray;
};

// Return available modules by recipe
export const returnModulesByRecipe = (name) => {
  const modulesArray = [];
  modules.forEach((module) => {
    if (module.limitations.length < 1) {
      modulesArray.push(module);
    } else {
      const contains = module.limitations.find(
        (limitation) => limitation === name
      );
      if (contains) {
        modulesArray.push(module);
      }
    }
  });
  return modulesArray;
};

// Return name by ID
export const returnNameById = (string) => {
  if (typeof string !== "string") {
    return;
  }
  const words = string.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const result = words.join(" ");
  return result;
};

// Return Recipe By ID
export const rrbi = (id) => newItems.find((recipe) => recipe.name === id);

// Return item icon source by ID
export const returnImageUrlById = (id) => {
  return `./new-icons/${id}.png`;
};

// Return ingredients by recipe ID for Redux
export const returnIngredients = (id) => {
  const recipe = rrbi(id);
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

// Format number
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

// Extend element based on UID
export const extendElementByUid = (obj, uid, recipe) => {
  if (typeof obj !== "object") {
    return;
  }

  if (obj.uid === uid) {
    const newIngredients = returnIngredients(recipe);
    if (newIngredients.length > 0) {
      obj.ingredients = newIngredients;
      obj.recipe = recipe;
    }
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      extendElementByUid(object, uid, recipe);
    });
  }
};

// Extend all elements based on ID
export const extendElementsById = (obj, id, recipe) => {
  if (typeof obj !== "object") {
    throw Error("wrong type in extendElementsById");
  }
  // console.log(id);
  if (obj.id === id) {
    const ingredients = recipe.ingredients;
    const newIngredients = [];
    ingredients.forEach((ingredient) => {
      const newIngredient = {
        id: ingredient.name,
        uid: uuidv4(),
      };
      newIngredients.push(newIngredient);
    });
    obj.ingredients = newIngredients;
    obj.recipe = recipe.name;
  }
  if (obj.ingredients) {
    obj.ingredients.forEach((ingredient) => {
      extendElementsById(ingredient, id, recipe);
    });
  }
};

// Collapse element based on UID
export const collapseElementByUid = (obj, uid) => {
  if (typeof obj !== "object") {
    return;
  }
  if (obj.uid === uid) {
    delete obj.ingredients;
    delete obj.recipe;
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      collapseElementByUid(object, uid);
    });
  }
};

// Collapse elements based on ID
export const collapseElementsById = (obj, id) => {
  if (typeof obj !== "object") {
    return;
  }
  if (obj.id === id) {
    delete obj.ingredients;
  } else if (obj.ingredients) {
    obj.ingredients.forEach((object) => {
      collapseElementsById(object, id);
    });
  }
};

// Recursive input summarizing
export const summarizeInputs = (outputItem, inputArray) => {
  if (typeof outputItem !== "object" && typeof inputArray !== "object") {
    throw Error("Wrong type in summarizeInputs");
  }

  if (!outputItem.ingredients) {
    const existingItem = inputArray.find((item) => item.id === outputItem.id);
    if (!existingItem) {
      const objToPush = {
        id: outputItem.id,
        amount: outputItem.amount,
        recipe: outputItem.recipe,
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

// Return req. ingredient count based on recipe and item ID
export const returnIngredientCount = (id, recipeName, ingredientId) => {
  const recipe = rrbi(recipeName);
  if (recipe) {
    const reqIngredient = recipe.ingredients.find(
      (ingredient) => ingredient.name === ingredientId
    );
    const product = recipe.products.find((product) => product.name === id);
    const result = Number(reqIngredient.amount / product.amount);
    return result;
  }
};

// Calculate item tree inputs
// Later this function also should calculate and inject machine counts
export const calculateIngredients = (outputItem) => {
  if (outputItem.ingredients) {
    const recipe = rrbi(outputItem.recipe);
    const product = recipe.products.find((item) => item.name === outputItem.id);

    outputItem.ingredients.forEach((ingredient) => {
      const recipeIngredient = recipe.ingredients.find(
        (item) => item.name === ingredient.id
      );
      if (ingredient) {
        ingredient.amount = Number(
          (recipeIngredient.amount * outputItem.amount) / product.amount
        );
      }
      calculateIngredients(ingredient);
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
