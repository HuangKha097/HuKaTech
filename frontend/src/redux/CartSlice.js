import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const isExistingProduct = state.products.find((item) => item.id === action.payload.id);
            if (isExistingProduct) {
                isExistingProduct.quantity++;
            } else if (!isExistingProduct) state.products.push(action.payload)
        },
        decrementProduct: (state, action) => {
            const isExistingProduct = state.products.find((item)=> item.id === action.payload.id);
            if (isExistingProduct && isExistingProduct.quantity > 1) {
                isExistingProduct.quantity--;
            }
        },

        removeProduct: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        }
    }
})

export const {addProduct, removeProduct,decrementProduct} = cartSlice.actions;
export default cartSlice.reducer
