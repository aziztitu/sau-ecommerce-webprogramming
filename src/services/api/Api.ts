import axios from 'axios';
import AppConfig from '@/AppConfig';

export const Api = {
    get instance() {
        const axiosInstance = axios.create({
            baseURL: AppConfig.api.baseURL,
            withCredentials: true,
        });

        return axiosInstance;
    },
};
