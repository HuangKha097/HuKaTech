import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    list: [],
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.list = action.payload;
        }
    }
});


export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;