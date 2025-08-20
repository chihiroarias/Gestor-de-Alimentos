import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listAlimentos: []
}

export const alimentosSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers:{
        guardarAlimentos: (state, action) => {
            state.listAlimentos = action.payload;
        }
    }
})

export const {guardarAlimentos} = alimentosSlice.actions;
export default alimentosSlice.reducer;