import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cantidadCalorias: 0,
    cantidadDiaria: 0
}

export const caloriasSlice = createSlice({
    name: "calorias",
    initialState,
    reducers:{
        incrementar: (state, action) => {
            state.cantidadCalorias += action.payload;
        },
        decrementar: (state, action) =>{
            state.cantidadCalorias -= action.payload; 
        },
        guardarCalorias: (state, action)=>{
            state.cantidadCalorias = action.payload;
        },
        guardarCaloriasDiarias: (state, action)=>{
            state.cantidadDiaria = action.payload;
        }
    }
})

export const {incrementar, decrementar, guardarCalorias, guardarCaloriasDiarias} = caloriasSlice.actions;
export default caloriasSlice.reducer;