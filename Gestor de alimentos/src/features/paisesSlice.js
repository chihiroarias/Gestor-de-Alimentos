import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paisesLista: []
}

export const paisesSlice = createSlice({
    name: "paises",
    initialState,
    reducers:{
        guardarPaises: (state, action) => {
            state.paisesLista = action.payload;
        }
    }
})

export const {guardarPaises} = paisesSlice.actions;
export default paisesSlice.reducer;