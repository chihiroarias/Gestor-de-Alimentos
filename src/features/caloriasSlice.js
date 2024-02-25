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
            state.cantidadCalorias = state.cantidadCalorias + action.payload;
        },
        decrementar: (state, action) =>{
            state.cantidadCalorias = state.cantidadCalorias - action.payload
        },
        guardarCalorias: (state, action)=>{
            //console.log("[guardarCalorias (cl1)] Calorias antes: " + state.cantidadCalorias);
            //console.log("[guardarCalorias (cl2)] Calorias que me pasan: " + action.payload);
            state.cantidadCalorias = action.payload;
            //console.log("[guardarCalorias (cl3)] Cómo queda el initialState: " + state.cantidadCalorias);
        },
        guardarCaloriasDiarias: (state, action)=>{
            state.cantidadDiaria = action.payload;
        }
    }
})

export const {incrementar, decrementar, guardarCalorias, guardarCaloriasDiarias} = caloriasSlice.actions;
export default caloriasSlice.reducer;