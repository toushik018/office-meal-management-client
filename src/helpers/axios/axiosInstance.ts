import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getNewAccessToken, removeUser } from '@/services/auth.service';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/constants/authKey';
import setAccessToken from '@/services/actions/setAccessToken';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    sent?: boolean;
}

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;

        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async (error: AxiosError) => {
        const config = error.config as CustomAxiosRequestConfig;
        console.error('Axios error:', error);

        if (error.response?.status === 401 && !config.sent) {
            config.sent = true;
            try {
                const response = await getNewAccessToken();
                const accessToken = response?.data?.data?.accessToken;

                if (accessToken) {
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    setToLocalStorage(authKey, accessToken);
                    setAccessToken(accessToken);
                    return instance(config);
                }
            } catch (refreshError) {
                console.error('Token refresh error:', refreshError);
                removeUser();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { instance };
