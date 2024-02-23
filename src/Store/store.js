import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "../features/paisesSlice";
import alimentosReducer from "../features/alimentosSlice";
import climaReducer from "../features/climaSlice";
import registrosReducer from "../features/registrosSlice";

export const store = configureStore({
    reducer: {
        paises: paisesReducer,
        alimentos: alimentosReducer,
        clima: climaReducer,
        registros: registrosReducer
    }
});