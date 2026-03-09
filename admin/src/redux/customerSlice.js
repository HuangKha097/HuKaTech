import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],             // Chứa danh sách tất cả khách hàng lấy từ API
    customerEdit: null,   // Chứa thông tin chi tiết của 1 khách hàng khi admin bấm vào sửa
}

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        // Cập nhật danh sách khách hàng vào store
        setCustomers: (state, action) => {
            state.list = action.payload;
        },
        // Cập nhật khách hàng đang được chọn để chỉnh sửa
        setCustomerEdit: (state, action) => {
            state.customerEdit = action.payload;
        }
    }
});

export const { setCustomers, setCustomerEdit } = customerSlice.actions;
export default customerSlice.reducer;