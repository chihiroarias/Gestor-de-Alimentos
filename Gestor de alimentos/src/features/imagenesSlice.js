import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imagenes: []
}

export const imagenesSlice = createSlice({
    name: "imagenes",
    initialState,
    reducers:{
        guardarImagenes: (state, action)=>{
            state.imagenes = action.payload;
        }
    }
})

export const {guardarImagenes} = imagenesSlice.actions;
export default imagenesSlice.reducer;