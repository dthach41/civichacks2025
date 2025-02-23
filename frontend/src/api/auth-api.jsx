import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const register = async (name, email, password, jobSeeking) => {
    const response = await axios.post(API_URL + '/auth/register', {
        name,
        email,
        password,
        jobSeeking
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(API_URL + '/auth/login', {
        email,
        password,
    });
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/user/${id}`)
    return response.data
}