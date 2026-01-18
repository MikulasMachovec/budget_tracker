import axios from "axios";
import { href } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_API

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// token refrest
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if(
            error.response?.status === 401 &&
            !originalRequest._retry
            ){
                originalRequest._retry = true;

                const refresh = localStorage.getItem('refreshToken');
                if(!refresh) return Promise.reject(error);

            try {
                const res = await axios.post(`${BASE_URL}/api/account/token/refresh/`, {refresh});
                const newAccess = res.data.access;
                localStorage.setItem('accessToken', newAccess); 
                
                api.defaults.headers.common.Authorization =
                    `Bearer ${newAccess}`;
                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            } catch (error) {
                localStorage.clear();
                window.location.href ='/'
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);    
    }
);


export default api;