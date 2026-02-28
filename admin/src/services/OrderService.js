import axios from "axios";


const API_URL = "http://localhost:8000/api/order";

export const getAllOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `${API_URL}/get-all-order`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

// Tìm kiếm đơn hàng theo status, phone, email...
export const searchOrder = async (queryParams) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `${API_URL}/search-order`,
        {
            params: queryParams, // axios sẽ tự động chuyển thành ?status=...&phone=...
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const updateOrder = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
        `${API_URL}/update-order/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};
export const getOrderDetails = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `${API_URL}/get-order-details/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

