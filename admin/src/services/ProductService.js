import axiosClient from "./axiosClient";

export const addNewProduct = async (data) => {
    const res = await axiosClient.post(`/product/add-new-product`, data);
    return res.data;
};

export const fetchAllProducts = async () => {
    const res = await axiosClient.get(`/product/get-all-products`);
    return res.data;
};

export const getProductById = async (id) => {
    const res = await axiosClient.get(`/product/get-product-by-id/${id}`);
    return res.data;
};

export const handleActiveProduct = async (id) => {
    const res = await axiosClient.put(`/product/handle-active/${id}`, {});
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await axiosClient.put(`/product/update-product/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axiosClient.delete(`/product/delete-product/${id}`);
    return res.data;
};

export const advancedSearchProductAdmin = async (data) => {
    const res = await axiosClient.get(`/product/advanced-search-products-admin`, { params: data });
    return res.data;
};