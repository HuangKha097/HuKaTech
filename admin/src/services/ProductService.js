import axios from "axios";

export const addNewProduct = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
        `http://localhost:8000/api/product/add-new-product`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};
export const fetchAllProducts = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-all-products`);
    return res.data;
}

export const getProductById = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-by-id/${id}`);
    return res.data;
};

export const handleActiveProduct = async (id) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(
        `http://localhost:8000/api/product/handle-active/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};
export const updateProduct = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(
        `http://localhost:8000/api/product/update-product/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
        `http://localhost:8000/api/product/delete-product/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const advancedSearchProductAdmin = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
        `http://localhost:8000/api/product/advanced-search-products-admin`,
        {
            params: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};