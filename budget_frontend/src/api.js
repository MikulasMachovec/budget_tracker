import axios from "axios";
import { href } from "react-router-dom";

const BASE_URL = 'http://127.0.0.1:8000'

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
                const res = await axios.post('http://127.0.0.1:8000/api/account/token/refresh/', {refresh});
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