import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  getIngredients,
  extendElementByUid,
  extendElementsById,
  collapseElementByUid,
  collapseElementsById,
  getRecipeCategory,
} from "../../utils/helperFunctions";

const initialState = {
  output: {},
  machines: {
    crafting: {
      id: "assembling-machine-1",
      craftingSpeed: 0.5,
      modules: [],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    "basic-crafting": {
      id: "assembling-machine-1",
      craftingSpeed: 0.5,
      modules: [],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    "advanced-crafting": {
      id: "assembling-machine-1",
      craftingSpeed: 0.5,
      modules: [],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    "crafting-with-fluid": {
      id: "assembling-machine-2",
      craftingSpeed: 0.75,
      modules: ["", ""],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    smelting: {
      id: "stone-furnace",
      craftingSpeed: 1,
      modules: [],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    "oil-processing": {
      id: "oil-refinery",
      craftingSpeed: 1,
      modules: ["", "", ""],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    chemistry: {
      id: "chemical-plant",
      craftingSpeed: 1,
      modules: ["", "", ""],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    centrifuging: {
      id: "centrifuge",
      craftingSpeed: 1,
      modules: ["", ""],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
    "rocket-building": {
      id: "rocket-silo",
      craftingSpeed: 1,
      modules: ["", "", "", ""],
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    },
  },
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addToOutput: (state, { payload }) => {
      const { id, amount, recipe } = payload;
      const recipeCategory = getRecipeCategory(recipe);
      state.output[id] = {
        id: id,
        uid: uuidv4(),
        amount: amount,
        recipe: recipe,
        ingredients: getIngredients(recipe),
        machine: { ...state.machines[recipeCategory], uid: uuidv4() },
      };
    },
    addToExistingOutput: ({ output }, { payload }) => {
      const { id, amount } = payload;
      output[id].amount += amount;
    },
    removeFromOutput: ({ output }, { payload }) => {
      delete output[payload];
    },
    modifyOutputElement: ({ output }, { payload }) => {
      const { id, amount } = payload;
      output[id] = {
        ...output[id],
        amount: amount,
      };
    },
    resetOutput: (state) => {
      state.output = {};
    },
    extendElement: (state, { payload }) => {
      const { uid, pid, recipe } = payload;
      const machine = {
        ...state.machines[getRecipeCategory(recipe)],
        uid: uuidv4(),
      };
      extendElementByUid(state.output[pid], uid, recipe, machine);
    },
    // refactor: receives recipe obj while extendElement receives recipe id string
    extendSameTypeElements: (state, { payload }) => {
      const { id, recipe } = payload;
      const machine = state.machines[getRecipeCategory(recipe.name)];
      Object.keys(state.output).forEach((key) => {
        extendElementsById(state.output[key], id, recipe, machine);
      });
    },
    collapseElement: ({ output }, { payload }) => {
      const { uid, pid } = payload;
      collapseElementByUid(output[pid], uid);
    },
    collapseSameTypeElements: ({ output }, { payload }) => {
      const id = payload;
      Object.keys(output).forEach((key) => {
        collapseElementsById(output[key], id);
      });
    },
    saveDefaultMachineConfig: ({ machines }, { payload }) => {
      const { categories, machineConfig } = payload;
      categories.forEach((category) => {
        machines[category] = machineConfig;
      });
    },
  },
});

export const {
  addToOutput,
  addToExistingOutput,
  removeFromOutput,
  modifyOutputElement,
  resetOutput,
  extendElement,
  extendSameTypeElements,
  collapseElement,
  collapseSameTypeElements,
  saveDefaultMachineConfig,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
