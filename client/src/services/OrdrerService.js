import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL_ORDER;


export const createNewOrder = async ({ name, email, phone, address, city, moreInfo, payMethod, cart }) => {
    // axios.post(url, body, config).
    const res = await axios.post(
        `${BASE_URL}/create-new-order`,
        { name, email, phone, address, city, moreInfo, payMethod, cart },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    return res;
};
