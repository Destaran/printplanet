export const selectOutput = (state) => state.calculator.output;
export const selectInput = (state) => state.calculator.input;
export const selectMachines = (state) => state.calculator.machines;

export const outputArray = (state) => Object.values(state.calculator.output);
export const outputKeys = (state) => Object.keys(state.calculator.output);
