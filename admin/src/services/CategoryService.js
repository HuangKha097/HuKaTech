import axiosClient from "./axiosClient";

export const addNewCategory = async (data) => {
    const res = await axiosClient.post(`/category/add-new-category`, data);
    return res.data;
};

export const updateCategory = async (id, data) => {
    const res = await axiosClient.put(`/category/update-category/${id}`, data);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await axiosClient.delete(`/category/delete-category/${id}`);
    return res.data;
};

export const getAllCategories = async () => {
    const res = await axiosClient.get(`/category/get-all-categories`);
    return res.data;
};

export const searchCategories = async (queryParams) => {
    const res = await axiosClient.get(`/category/search-categories`, { params: queryParams });
    return res.data;
};

export const getActiveCategories = async () => {
    const res = await axiosClient.get(`/category/get-active-categories`);
    return res.data;
};