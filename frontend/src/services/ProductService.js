import axios from 'axios';

// axios.post(url, data, config) → data là body.
// axios.delete(url, config) → muốn gửi body, phải đặt trong config.data.
// vd: await axios.delete(url, { data: { id }, headers: { ... } });
export const addNewProduct = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/product/add-new-product`, data, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
};

export const getAllProducts = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/get-all-products`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};

export const getProductToShowHome = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/get-product-to-show-home`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};
export const getProductsByCategory = async (category) => {
    const res = await axios.get(`http://localhost:3001/api/product/get-products-by-category?category=${category}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};
export const getProductsByName = async (name) => {
    const res = await axios.get(`http://localhost:3001/api/product/get-products-by-name?name=${name}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};
export const getProductsByType = async (type) => {
    const res = await axios.get(`http://localhost:3001/api/product/get-products-by-type?type=${type}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};
export const getProductsById = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/product/get-product-by-id?_id=${id}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res;
};
export const deleteProduct = async (_id) => {
    const res = await axios.delete(`http://localhost:3001/api/product/delete-product`, {
        headers: { 'Content-Type': 'application/json' },
        data: { _id },
    });
    return res;
};
