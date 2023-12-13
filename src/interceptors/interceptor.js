import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.response.error === "TOKEN_EXPIRED" && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get(REFRESH_TOKEN);
                const response = await axios.post('/api/v1/auth/refresh-token', { refreshToken });
                const { token } = response.data;

                Cookies.set('token', token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
            }
        } else if (error?.response?.data){
            return Promise.resolve(error.response);
        } 

        return Promise.reject(error);
    }
);

export default api