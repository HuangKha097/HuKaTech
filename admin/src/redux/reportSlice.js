import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Lưu trữ khoảng thời gian admin đang chọn (mặc định 7 ngày)
    timeRange: '7days',
    // Khởi tạo cấu trúc dữ liệu báo cáo mặc định
    data: {
        kpi: { totalRevenue: 0, totalOrders: 0, productsSold: 0, totalCustomers: 0 },
        charts: { revenueTrend: [], categoryData: [] },
        tables: { topProducts: [], recentOrders: [] }
    }
};

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        // Cập nhật khoảng thời gian lọc
        setTimeRange: (state, action) => {
            state.timeRange = action.payload;
        },
        // Cập nhật dữ liệu báo cáo lấy từ API
        setReportData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setTimeRange, setReportData } = reportSlice.actions;
export default reportSlice.reducer;