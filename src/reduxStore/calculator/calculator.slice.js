import { createSlice } from "@reduxjs/toolkit";
import { robi, findTreeElementAddIngredients, removeObject, addAmountToChildren, formatNumber } from "../../utils/helperFunctions";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    output: [],
    input: [],
    machines: []
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        addToOutput: ({ output, input }, { payload }) => {
            const { id, amount } = payload;
            if (id) {
                const itemObject = robi(id)
                // Check if the added object is already in the output array
                // If yes, sum amounts
                const existingItem = output.find((item) => item.id === id);
                if (existingItem) {
                    output.forEach(item => {
                        if (item.id === id) {
                            item.amount = Number(item.amount) + Number(amount);
                            addAmountToChildren(item, item.amount);
                        }
                    })
                } else {
                    // If no, create ingredients array
                    const objectToPushIngredients = itemObject.recipe.ingredients.map(ingredient => {
                        const baseYield = itemObject.recipe.yield;
                        const amountCalc = (Number(amount) * Number(ingredient.amount)) / Number(itemObject.recipe.yield);
                        const result = {
                            ...ingredient,
                            uid: uuidv4(),
                            amount: formatNumber(amountCalc),
                            baseAmount: ingredient.amount,
                            baseYield: baseYield
                        };
                        return result;
                    });
                    // Push new output element to output array
                    const objectToPush = {
                        id: id,
                        amount: formatNumber(Number(amount)),
                        ingredients: objectToPushIngredients
                    }
                    output.push(objectToPush);
                }
            }
        },
        removeFromOutput: ({ output }, { payload }) => {
            const indexToRemove = output.findIndex(item => item.id === payload);
            if (indexToRemove !== -1) {
                output.splice(indexToRemove, 1);
            }
        },
        modifyOutputElement: ({ output }, { payload }) => {
            const { id, amount } = payload;
            output.map(item => {
                if (item.id === id) {
                    item.amount = formatNumber(Number(amount));
                    const difference = item.amount - amount;
                    addAmountToChildren(item, difference);
                }
            })
        },
        extendElement: ({ output }, { payload }) => {
            const { id, amount, uid, parentId } = payload;
            const item = robi(id);
            const ingredientsArray = item.recipe.ingredients.map(ingredient => {
                const baseYield = item.recipe.yield;
                const amountCalc = formatNumber(Number(ingredient.amount) * Number(amount) / Number(item.recipe.yield));
                return {
                    ...ingredient,
                    uid: uuidv4(),
                    amount: amountCalc,
                    baseAmount: ingredient.amount,
                    baseYield: baseYield
                }
            });
            const elementIndex = output.findIndex(item => item.id === parentId);
            findTreeElementAddIngredients(output[elementIndex], uid, ingredientsArray);
        },
        collapseElement: ({ output }, { payload }) => {
            const { uid, parentId } = payload;
            const elementIndex = output.findIndex(item => item.id === parentId);
            removeObject(output[elementIndex], uid);
        }
    }
});

export const { addToOutput, removeFromOutput, modifyOutputElement, extendElement, collapseElement } = calculatorSlice.actions;

export default calculatorSlice.reducer;