// All vanilla Factorio recipes (old)
import data from "../../src/utils/recipes/recipes.dictionary.json";
export const items = Object.values(data);

// All vanilla Factorio data
import newData from "../../src/utils/recipes/database.json";
const database = Object.values(newData);
const newItems = database[0];

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

// Return Object By ID
export const robi = (id) => {
  return data[id];
};

// Return Recipe By ID
export const rrbi = (id) => newItems.find((recipe) => recipe.name === id);

// Return item icon source by ID
export const returnImageUrlById = (id) => {
  return `./new-icons/${id}.png`;
};

// Format number
export const formatNumber = (number) => {
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
