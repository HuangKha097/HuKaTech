import axios from 'axios';

export const getActiceCategories = async () => {
    const res = await axios.get(`http://localhost:8000/api/category/get-active-categories`);
    return res.data;
};

