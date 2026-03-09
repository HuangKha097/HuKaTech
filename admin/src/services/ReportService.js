
import axiosClient from "./axiosClient";

export const getSalesReport = async (timeRange) => {
    const res = await axiosClient.get(`/report/get-sales-report`, {
        params: { timeRange }
    });
    return res.data;
};