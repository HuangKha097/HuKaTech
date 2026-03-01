import axiosClient from "./axiosClient";

export const login = async (data) => {
    const res = await axiosClient.post(`/user/sign-in`, data);
    return res.data;
};

export const logout = async () => {
    const res = await axiosClient.post(`/user/sign-out`);
    return res.data;
};