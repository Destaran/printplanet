import {
  calculateTree,
  summarizeInputs,
  summarizeMachines,
} from "../../utils/helperFunctions";
import { createSelector } from "reselect";

export const outputValues = (state) => Object.values(state.calculator.output);
export const outputKeys = (state) => Object.keys(state.calculator.output);

export const calculatedOutput = (state) => {
  const output = Object.values(state.calculator.output);
  const newOutput = [];
  output.forEach((element) => {
    const elementCopy = structuredClone(element);
    calculateTree(elementCopy);
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

export const machinesArray = createSelector(calculatedOutput, (output) => {
  const machines = [];
  output.forEach((element) => {
    summarizeMachines(element, machines);
  });
  return machines;
});

export const defaultCraftingMachine = (state) =>
  state.calculator.machines.crafting;
