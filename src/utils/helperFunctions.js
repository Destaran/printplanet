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
    obj.amount = formatNumber((obj.baseAmount * amount) / obj.baseYield);
  }

  if ('ingredients' in obj) {
    obj.ingredients.forEach(ingredient =>
      addAmountToChildren(ingredient, obj.amount)
    )
  }
};

// Map
export const mapInput = (obj, inputArray) => {
  if ('ingredients' in obj) {
    obj.ingredients.forEach(ingredient => {
      mapInput(ingredient, inputArray);
    })
  } else {
    const existingItem = inputArray.find((item) => item.id === obj.id);
    if (existingItem) {
      inputArray.forEach(item => {
        if (item.id === obj.id) {
          let index = inputArray.indexOf(item);
          const newItem = {
            ...item,
            amount: Number(item.amount) + Number(obj.amount)
          };
          console.log(newItem);
          inputArray.splice(index, 1);
          inputArray.push(newItem);
        }
      })
    } else if (!existingItem) {
      inputArray.push(obj);
    }
  }
};