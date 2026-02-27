import axios from "axios";

export const login = async (data) => {
    const res = await axios.post("http://localhost:8000/api/user/sign-in", data);
    return res.data;
}

export const logout = async () => {
    const res = await axios.post("http://localhost:8000/api/user/logout");
    return res.data;
};