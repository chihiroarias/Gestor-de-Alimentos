import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    temperaturas: []
}

export const climaSlice = createSlice({
    name: "clima",
    initialState,
    reducers:{
        guardarTemperaturas: (state, action) => {
            state.temperaturas = action.payload;
        }
    }
})

export const {guardarTemperaturas} = climaSlice.actions;
export default climaSlice.reducer;