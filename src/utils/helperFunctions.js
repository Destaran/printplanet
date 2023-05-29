// all vanilla Factorio recipes
import data from '../../src/utils/recipes/recipes.dictionary.json';
export const items = Object.values(data);

// Return Object By ID
export const robi = (id) => {
  return items.filter(item => { return item.id === id; })[0];
};

// Return item icon source by ID
export const returnImageUrlById = (id) => {
  return `./item-icons/${id}.png`
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

// Add ingredients to object tree based on uid
export const findTreeElementAddIngredients = (obj, uid, ingredientArray) => {
  if (typeof obj !== 'object') {
    return;
  }

  if ('uid' in obj) {
    if (obj.uid === uid) {
      obj.ingredients = ingredientArray;
    }
  }
  if ('ingredients' in obj) {
    for (let ingredient of obj.ingredients) {
      findTreeElementAddIngredients(ingredient, uid, ingredientArray);
    }
  }
};

// Remove ingredients from object tree based on uid
export const removeObject = (obj, uid) => {
  if (typeof obj !== 'object') {
    return;
  }

  if ('ingredients' in obj) {
    if (obj.uid === uid) {
      delete obj.ingredients;
    } else {
      for (let ingredient of obj.ingredients) {
        removeObject(ingredient, uid);
      }
    }
  }
};

// Add amount to already existing output element and its children
export const addAmountToChildren = (obj, amount) => {
  if (typeof obj !== 'object') {
    return;
  }

  if ('baseAmount' in obj) {
    obj.amount = (obj.baseAmount * amount) / obj.baseYield;
  }

  if ('ingredients' in obj) {
    obj.ingredients.forEach(ingredient =>
      addAmountToChildren(ingredient, obj.amount)
    )
  }
};

// Map input based on output array
export const mapInput = (obj, inputArray) => {
  if ('ingredients' in obj) {
    obj.ingredients.forEach(ingredient => {
      mapInput(ingredient, inputArray);
    })
  } else {
    const existingItem = inputArray.find((item) => item.id === obj.id);
    if (existingItem) {
      const index = inputArray.indexOf(existingItem);
      const newItem = {
        ...existingItem,
        amount: Number(existingItem.amount) + Number(obj.amount)
      };
      inputArray.splice(index, 1);
      inputArray.push(newItem);
    } else if (!existingItem) {
      inputArray.push(obj);
    }
  }
};

// Map machines based on output array
export const mapMachines = (obj, inputArray) => {
  if ('id' in obj) {
    
  }
};