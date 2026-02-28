import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],         // Chứa danh sách tất cả đơn hàng lấy từ API
    orderEdit: {},    // Chứa thông tin chi tiết của 1 đơn hàng khi admin bấm vào xem/sửa
}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        // Cập nhật danh sách đơn hàng vào store
        setOrders: (state, action) => {
            state.list = action.payload;
        },
        // Cập nhật đơn hàng đang được chọn để chỉnh sửa (VD: đổi trạng thái)
        setOrderEdit: (state, action) => {
            state.orderEdit = action.payload;
        }
    }
});

// Export các action để dùng trong component (dispatch)
export const { setOrders, setOrderEdit } = orderSlice.actions;

// Export reducer để gắn vào store
export default orderSlice.reducer;