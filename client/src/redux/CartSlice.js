import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newItem = action.payload;
            const isExistingProduct = state.products.find((item) => item.id === newItem.id);

            if (isExistingProduct) {
                // Kiểm tra: Nếu số lượng hiện tại vẫn NHỎ HƠN số lượng tồn kho thì mới cho phép tăng
                if (isExistingProduct.quantity < newItem.countInStock) {
                    isExistingProduct.quantity++;
                }

            } else {
                // Nếu chưa có trong giỏ hàng và kho còn hàng (> 0) thì thêm mới
                if (newItem.countInStock > 0) {
                    state.products.push(newItem);
                }
            }
        },

        decrementProduct: (state, action) => {
            const isExistingProduct = state.products.find((item) => item.id === action.payload.id);

            if (isExistingProduct && isExistingProduct.quantity > 1) {
                isExistingProduct.quantity--;
            }
        },

        removeProduct: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        }
    }
})

export const { addProduct, removeProduct, decrementProduct } = cartSlice.actions;
export default cartSlice.reducer;