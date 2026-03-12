import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL_CATEGORY;

export const getActiceCategories = async () => {
    const res = await axios.get(`${BASE_URL}/get-active-categories`);
    return res.data;
};

