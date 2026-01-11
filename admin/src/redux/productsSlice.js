import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    list: [],
    productsEdit: {},
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.list = action.payload;
        },
        setProductsEdit: (state, action) => {
            state.productsEdit = action.payload;
        }
    }
});


export const {setProducts, setProductsEdit} = productsSlice.actions;
export default productsSlice.reducer;