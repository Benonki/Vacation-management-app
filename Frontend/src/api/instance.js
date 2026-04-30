import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});