import { configureStore } from "@reduxjs/toolkit";

import calculatorReducer from "./calculator/calculator.slice";

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer
    }
});