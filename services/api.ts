import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from "axios";




const API_BASE_URL = __DEV__ 
    ? "http://localhost:3000/api" 
    : "https://votre-domaine-production.com/api";

// créer un instance Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',	
    }
})

// Intercepteur pour ajouter le token jwt automatiquement
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('acess_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Intercepteur pour gérer le refresh token
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        //si erreur 401 et pas déja tenté de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                 //appel au endpont Django de regresh
                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
                    refresh: refreshToken
                });

                const { access } =response.data;
                await AsyncStorage.setItem('access_token', access);

                //reesauer la requete originale avec le nouveau token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                }
                return api(originalRequest);
            } catch (refreshError) {
                //echec du refresh token, rediriger vers login ou autre action
                await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

//heplper pour gerer les erreurs 
export const handleApiError = (error: any): string => {
    if ( axios.isAxiosError(error)) {
        if (error.response) {
            //Erreur serveur (4xx, 5xx)
            const message = error.response.data?.message || error.response.data?.detail;
            return message || `Erreur: ${error.response.status}`;
        } else if (error.request) {
            return "Impossible de contacter le serveur";
        }
    }
    return "Une erreur inattendue est survenue";
};