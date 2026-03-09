import axios from 'axios';

export const addNewProduct = async (data) => {
    const res = await axios.post(`http://localhost:8000/api/product/add-new-product`, data);
    return res.data;
};

export const getAllProducts = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-all-products`);
    return res.data;
};


export const getProductToShowHome = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-to-show-home`);
    return res.data;
};

export const getProductsByCategory = async (category) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-category`, {
        params: {category: category}
    });
    return res.data;
};

export const getProductsByName = async (name) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-name`, {
        params: {name: name}
    });
    return res.data;
};

export const getProductsByType = async (type) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-type`, {
        params: {type: type}
    });
    return res.data;
};


export const getProductsById = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-by-id/${id}`);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/product/delete-product/${id}`);
    return res.data;
};

export const getRelatedProducts = async (type, id) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-related-products/${id}?type=${type}`);
    return res.data;
};
export const advancedSearchProductClient = async (data) => {
    const res = await axios.post(
        "http://localhost:8000/api/product/advanced-search-products-client",
        data
    );
    return res.data;
};
