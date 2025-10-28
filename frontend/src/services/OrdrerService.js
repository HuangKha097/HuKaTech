import axios from 'axios';

export const createNewOrder = async ({ name, email, phone, address, city, moreInfo, payMethod, cart }) => {
    // axios.post(url, body, config).
    const res = await axios.post(
        `http://localhost:3001/api/order/create-new-order`,
        { name, email, phone, address, city, moreInfo, payMethod, cart },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    return res;
};
