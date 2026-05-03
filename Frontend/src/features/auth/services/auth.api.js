import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Using the Vite proxy we set up earlier which points to localhost:3000
    withCredentials: true,
});

// REGISTER USER
export const registerUser = async ({ email, password, name }) => {
    try {
        const response = await api.post('/auth/register', { email, password, name });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// LOGIN USER
export const loginUser = async ({ email, password }) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// GET ME 
export const getMe = async () => {
    try {
        const response = await api.get('/auth/get-me');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// LOGOUT USER
export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}