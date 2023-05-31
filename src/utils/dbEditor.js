import db from './recipes/database.json' assert { type: "json" };
import itemsOld from './recipes/recipes.dictionary.json' assert { type: "json" };

const database = Object.values(db);
const recipes = database[0];

const items = Object.values(itemsOld);

const newArray = [];

items.forEach(item => {
    recipes.forEach(recipe => {
        if (item.id === recipe.name) {
            const baseYield = recipe.products.find(element => element.name === item.id).amount;
            const newIngredients = [];
            recipe.ingredients.forEach(ingredient => {
                const newIngredient = {
                    ...ingredient,
                    id: ingredient.name,
                }
                delete newIngredient.name
                delete newIngredient.type
                newIngredients.push(newIngredient)
            })
            item = {
                id: item.id,
                name: item.name,
                category: recipe.category,
                recipe: {
                    time: recipe.energy,
                    yield: baseYield,
                    ingredients: newIngredients
                }
            }
            console.log(item);
            console.log(item.recipe);
            console.log(item.recipe.ingredients[0]);
        }
    })
})