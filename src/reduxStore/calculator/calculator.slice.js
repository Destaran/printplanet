import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    output: [],
    input: [],
    machines: []
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        addToOutput: ({ output }, { payload }) => {
            const { id, amount } = payload;
            const existingItem = output.find((item) => item.id === id);

            if (existingItem) {
                output.map(item => {
                    if (item.id === id) {
                        item.amount = Number(item.amount) + Number(amount);
                    }
                })
            } else {
                output.push(payload);
            }
        },
        removeFromOutput: ({ output }, { payload }) => {
            let indexToRemove = output.findIndex(item => item.id === payload);
            if (indexToRemove !== -1) {
                output.splice(indexToRemove, 1);
              }
        }
    }
});

export const { addToOutput, removeFromOutput } = calculatorSlice.actions;

export default calculatorSlice.reducer;