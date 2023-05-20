import data from '../../src/utils/recipes/recipes.dictionary.json';
export const items = Object.values(data);

// Return Object By ID
export const robi = (id) => {
  return items.filter(item => { return item.id === id; })[0];
};

export const returnImageUrlById = (id) => {
  return `./item-icons/${id}.png`
};