import {
  calculateTree,
  summarizeInputs,
  summarizeMachines,
  summarizeModules,
} from "../../utils/helperFunctions";
import { createSelector } from "reselect";

export const outputObject = (state) => state.calculator.output;
export const outputValues = (state) => Object.values(state.calculator.output);
export const outputKeys = (state) => Object.keys(state.calculator.output);

export const calculatedOutput = (state) => {
  const output = Object.values(state.calculator.output);
  const calcOutput = [];
  output.forEach((item) => {
    const itemCopy = structuredClone(item);
    calculateTree(itemCopy);
    calcOutput.push(itemCopy);
  });
  return calcOutput;
};

export const inputArray = createSelector(calculatedOutput, (output) => {
  const input = [];
  output.forEach((item) => {
    summarizeInputs(item, input);
  });
  return input;
});

export const machinesArray = createSelector(calculatedOutput, (output) => {
  const machines = [];
  output.forEach((item) => {
    summarizeMachines(item, machines);
    summarizeModules(item, machines);
  });
  return machines;
});

export const defaultCraftingMachine = (state) =>
  state.calculator.machines.crafting;

export const craftingMachines = (state) => state.calculator.machines;
