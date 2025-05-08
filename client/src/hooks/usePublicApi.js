import axios from 'axios';

const apiEndPoint = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true,
})
const usePublicApi = () => {
    return apiEndPoint;
};

export default usePublicApi;