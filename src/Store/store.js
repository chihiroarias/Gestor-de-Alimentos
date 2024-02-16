import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "../features/paisesSlice"


export const store = configureStore({
    reducer: {
        paises: paisesReducer
    }
});