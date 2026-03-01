import axiosClient from "./axiosClient";

export const getAllOrder = async () => {
    const res = await axiosClient.get(`/order/get-all-order`);
    return res.data;
};

export const searchOrder = async (queryParams) => {
    const res = await axiosClient.get(`/order/search-order`, { params: queryParams });
    return res.data;
};

export const updateOrder = async (id, data) => {
    const res = await axiosClient.put(`/order/update-order/${id}`, data);
    return res.data;
};

export const getOrderDetails = async (id) => {
    const res = await axiosClient.get(`/order/get-order-details/${id}`);
    return res.data;
};