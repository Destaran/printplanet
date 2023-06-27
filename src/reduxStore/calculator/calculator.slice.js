import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  returnIngredients,
  extendElementByUid,
  extendElementsById,
  collapseElementByUid,
  collapseElementsById,
} from "../../utils/helperFunctions";

const initialState = {
  output: {},
  machines: {
    crafting: {
      id: "assembling-machine-1",
    },
    "basic-crafting": {
      id: "assembling-machine-1",
    },
    "advanced-crafting": {
      id: "assembling-machine-1",
    },
    "crafting-with-fluid": {
      id: "assembling-machine-2",
      modules: [{}, {}],
      beacons: {
        amount: 0,
        modules: [{}, {}],
      },
    },
    smelting: {
      id: "stone-furnance",
    },
    "oil-processing": {
      id: "oil-refinery",
    },
    chemistry: {
      id: "chemical-plant",
    },
    centrifuging: {
      id: "centrifuge",
    },
    "rocket-building": {
      id: "rocket-silo",
    },
  },
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addToOutput: ({ output }, { payload }) => {
      const { id, amount, recipe } = payload;
      output[id] = {
        id: id,
        uid: uuidv4(),
        amount: amount,
        recipe: recipe,
        ingredients: returnIngredients(recipe),
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
    extendElement: ({ output }, { payload }) => {
      const { uid, pid, recipe } = payload;
      extendElementByUid(output[pid], uid, recipe);
    },
    extendSameTypeElements: ({ output }, { payload }) => {
      const { id, recipe } = payload;
      Object.keys(output).forEach((key) => {
        extendElementsById(output[key], id, recipe);
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
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
