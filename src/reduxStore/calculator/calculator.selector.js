import {
  calculateIngredients,
  summarizeInputs,
} from "../../utils/helperFunctions";
import { createSelector } from "reselect";

export const outputArray = (state) => Object.values(state.calculator.output);
export const outputKeys = (state) => Object.keys(state.calculator.output);

export const calculatedOutput = (state) => {
  const output = Object.values(state.calculator.output);
  const newOutput = [];
  output.forEach((element) => {
    const elementCopy = structuredClone(element);
    calculateIngredients(elementCopy);
    newOutput.push(elementCopy);
  });
  return newOutput;
};

export const inputArray = createSelector(calculatedOutput, (output) => {
  const input = [];
  output.forEach((element) => {
    summarizeInputs(element, input);
  });
  return input;
});
