import axiosClient from "./axiosClient";

export const getAllCustomers = async () => {
    const res = await axiosClient.get(`/customer/get-all`);
    return res.data;
};

export const searchCustomers = async (queryParams) => {
    // queryParams sẽ có dạng { keyword: 'abc' }
    const res = await axiosClient.get(`/customer/search`, { params: queryParams });
    return res.data;
};

export const updateCustomer = async (id, data) => {
    const res = await axiosClient.put(`/customer/update/${id}`, data);
    return res.data;
};

export const deleteCustomer = async (id) => {
    const res = await axiosClient.delete(`/customer/delete/${id}`);
    return res.data;
};