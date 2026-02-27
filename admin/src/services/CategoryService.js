import axios from "axios";

export const addNewCategory = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
        `http://localhost:8000/api/category/add-new-category`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};


export const updateCategory = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
        `http://localhost:8000/api/category/update-category/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
        `http://localhost:8000/api/category/delete-category/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const getAllCategories = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `http://localhost:8000/api/category/get-all-categories`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

// Tìm kiếm danh mục theo name, status hoặc cả hai
export const searchCategories = async (queryParams) => {
    const token = localStorage.getItem("token");
    // axios sẽ tự động chuyển object queryParams thành chuỗi query trên URL (ví dụ: ?name=abc&status=active)
    const res = await axios.get(
        `http://localhost:8000/api/category/search-categories`,
        {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const getActiveCategories = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `http://localhost:8000/api/category/get-active-categories`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};