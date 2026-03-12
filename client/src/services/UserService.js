import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_USER;

export const registerUser = async (data) =>{
  const res = await axios.post(
    `${BASE_URL}/sign-up`,
    data, {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}

export const loginUser = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/sign-in`,
    data, {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
};

export const getUserById = async (userId) =>{
  const res = await axios.get(
    `${BASE_URL}/get-user-by-id?_id=${userId}`,
  {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}
