import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL_PRODUCT;


export const addNewProduct = async (data) => {
    const res = await axios.post(`${BASE_URL}/add-new-product`, data);
    return res.data;
};

export const getAllProducts = async () => {
    const res = await axios.get(`${BASE_URL}/get-all-products`);
    return res.data;
};


export const getProductToShowHome = async () => {
    const res = await axios.get(`${BASE_URL}/get-product-to-show-home`);
    return res.data;
};

export const getProductsByCategory = async (category, limit, skip) => {
    const res = await axios.get(`${BASE_URL}/get-products-by-category`, {
        params: {
            category: category,
            limit: limit,
            skip: skip
        }
    });
    return res.data;
};

export const getProductsByName = async (name) => {
    const res = await axios.get(`${BASE_URL}/get-products-by-name`, {
        params: {name: name}
    });
    return res.data;
};

export const getProductsByType = async (type) => {
    const res = await axios.get(`${BASE_URL}/get-products-by-type`, {
        params: {type: type}
    });
    return res.data;
};


export const getProductsById = async (id) => {
    const res = await axios.get(`${BASE_URL}/get-product-by-id/${id}`);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-product/${id}`);
    return res.data;
};

export const getRelatedProducts = async (type, id) => {
    const res = await axios.get(`${BASE_URL}/get-related-products/${id}?type=${type}`);
    return res.data;
};
export const advancedSearchProductClient = async (data) => {
    const res = await axios.post(
        `${BASE_URL}/advanced-search-products-client`,
        data
    );
    return res.data;
};
