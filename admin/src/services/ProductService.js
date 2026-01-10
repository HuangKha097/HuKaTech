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