import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  output: {},
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addToOutput: ({ output }, { payload }) => {
      const { id, amount, recipe } = payload;
      if (output[id]) {
        output[id].amount += amount;
      } else {
        output[id] = {
          id: id,
          recipe: recipe,
          amount: amount,
          extend: true,
        };
      }
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
    extendElement: (state, action) => {},
    collapseElement: (state, action) => {},
  },
});

export const {
  addToOutput,
  removeFromOutput,
  modifyOutputElement,
  resetOutput,
  extendElement,
  collapseElement,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
