import axios from 'axios';
import React from 'react';
const secureApi = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true
})
const useSecureApi = () => {
    secureApi.interceptors.request.use(
        function (config) {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('xytz5T');
            if (!token) {
                console.error("Token is missing");
                return Promise.reject(new Error("Authorization token is missing"));
            }

            // Extract the actual token from the stored value
            const parsedToken = token.split('+')[1];
            if (!parsedToken) {
                console.error("Token format is invalid");
                return Promise.reject(new Error("Invalid token format"));
            }

            // Attach the token to the Authorization header
            config.headers.Authorization = `Bearer ${parsedToken}`;
            return config;
        },
        function (error) {
            // Log and reject the request error
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );
    return secureApi
};

export default useSecureApi;