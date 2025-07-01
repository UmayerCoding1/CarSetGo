import axios  from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5000/api/v1";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})


export const callGetApis = async (endpoint) => {
    
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error in GET API call:", error);
        throw error;
    }
}

export const callPostApis = async (endpoint,data) => {
   
    
    try {
        const response = await api.post(endpoint,data);
        return response.data;
    } catch (error) {
        console.log('Error in POST API call: ', error); 
        throw error;  
    }
}
export const callPutApis = async (endpoint,data) => {

    
    try {
        const response = await api.put(endpoint,data);
        
        
        return response.data;
    } catch (error) {
        console.log('Error in PUT API call: ', error); 
        throw error;  
    }
}
export const callDeleteApis = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        console.log('Error in DELETE API call: ', error); 
        throw error;  
    }
}


