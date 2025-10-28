import axios from "axios";

export const registerUser = async (data) =>{
  const res = await axios.post(
    `http://localhost:3001/api/user/sign-up`,
    data, {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}

export const loginUser = async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/user/sign-in`,
    data, {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
};

export const getUserById = async (userId) =>{
  const res = await axios.get(
    `http://localhost:3001/api/user/get-user-by-id?_id=${userId}`,
  {
      headers: { "Content-Type": "application/json"}
    }
  );
  return res.data;
}
