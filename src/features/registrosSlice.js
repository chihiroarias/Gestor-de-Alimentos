import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    registrosLista: []
}

export const registrosSlice = createSlice({
    name: "registros",
    initialState,
    reducers:{
        guardarRegistros: (state, action) => {
            state.registrosLista = action.payload;
        },
        guardarUnRegistro: (state, action) => {
            state.registrosLista.push(action.payload);
        },
        borrarRegistro: (state, action) => {
            state.registrosLista = state.registrosLista.filter(obj => obj.id !== action.payload);
        }
    }
})

export const {guardarRegistros, guardarUnRegistro, borrarRegistro} = registrosSlice.actions;
export default registrosSlice.reducer;