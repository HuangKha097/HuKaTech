import axios from "axios";

export const addNewProduct = async (data) => {
    // XÓA BỎ dòng headers: { 'Content-Type': 'application/json' }
    const res = await axios.post(`http://localhost:8000/api/product/add-new-product`, data);
    return res.data;
}

export const fetchAllProducts = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-all-products`);
    return res.data;
}

export const getProductById = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-by-id/${id}`);
    return res.data;
};

export const handleActiveProduct = async (id) => {
    const res = await axios.put(`http://localhost:8000/api/product/handle-active/${id}`);
    return res.data;
}
export const updateProduct = async (id, data) => {
    const res = await axios.put(
        `http://localhost:8000/api/product/update-product/${id}`,
        data
    );
    return res.data;
};
