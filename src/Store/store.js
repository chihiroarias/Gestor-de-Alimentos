import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "../features/paisesSlice";
import alimentosReducer from "../features/alimentosSlice";


export const store = configureStore({
    reducer: {
        paises: paisesReducer,
        alimentos: alimentosReducer
    }
});