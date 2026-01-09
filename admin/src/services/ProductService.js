import axios from "axios";

export const addNewProduct = async (data) => {
    const res = await axios.post(`http://localhost:8000/api/product/add-new-product`, data,{
        headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
}