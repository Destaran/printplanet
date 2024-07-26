import {
  summarizeBeacons,
  summarizeInputs,
  summarizeMachines,
  summarizeModules,
  calculateTree,
} from "./calculator.utils";
import { createSelector } from "reselect";
import { RootState } from "../store";
import { OutputItem, SummaryItem } from "../../utils/types";

export const outputObject = (state: RootState) => state.calculator.output;

export const outputValues = (state: RootState): OutputItem[] =>
  Object.values(state.calculator.output);

export const outputKeys = (state: RootState) =>
  Object.keys(state.calculator.output);

export const calculatedOutput = (state: RootState) => {
  const output: OutputItem[] = Object.values(state.calculator.output);
  return output.map((item) => {
    return calculateTree(item);
  });
};

export const inputArray = createSelector(calculatedOutput, (output) => {
  const input: SummaryItem[] = [];
  output.forEach((item) => {
    summarizeInputs(item, input);
  });

  return input;
});

export const machinesArray = createSelector(calculatedOutput, (output) => {
  const machines: SummaryItem[] = [];
  output.forEach((item) => {
    summarizeMachines(item, machines);
    summarizeModules(item, machines);
    summarizeBeacons(item, machines);
  });

  return machines;
});

export const defaultCraftingMachine = (state: RootState) =>
  state.calculator.machines.crafting;

export const craftingMachines = (state: RootState) => state.calculator.machines;
