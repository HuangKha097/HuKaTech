import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {

                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }


                const res = await axios.post(`http://localhost:8000/api/user/refresh-token`, {}, {
                    headers: {token: `Bearer ${refreshToken}`}
                });


                if (res.data.status === 'OK') {
                    const newAccessToken = res.data.access_token;
                    localStorage.setItem('token', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                } else {

                    localStorage.clear();
                    window.location.href = '/login';
                }
            } catch (refreshError) {

                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosClient;