import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_CART;

export const addProduct = async ({ userId, productId,  name , price , quantity }) =>{
    const res = await axios.post(
    `${BASE_URL}/add-product`,{ userId, productId,  name , price ,quantity },{
      headers: { "Content-Type": "application/json"}
    }
  );
  return res;
}

export const getProducts = async (cartId) =>{
    // axios.post(url, body, config).
    const res = await axios.get(
    `${BASE_URL}/get-products?_id=${cartId}`,{
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}