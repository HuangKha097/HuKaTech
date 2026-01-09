import axios from "axios";

export const addProduct = async ({ userId, productId,  name , price , quantity }) =>{
    // axios.post(url, body, config).
    const res = await axios.post(
    `http://localhost:8000/api/cart/add-product`,{ userId, productId,  name , price ,quantity },{
      headers: { "Content-Type": "application/json"}
    }
  );
  return res;
}

export const getProducts = async (cartId) =>{
    // axios.post(url, body, config).
    const res = await axios.get(
    `http://localhost:8000/api/cart/get-products?_id=${cartId}`,{
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}