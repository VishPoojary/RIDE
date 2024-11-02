import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers['x-auth-token'] = localStorage.getItem('token');
    }
    return req;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const getProfile = () => API.get('/auth/profile');
export const bookRide = (rideData) => API.post('/rides/book', rideData);
export const bidRide = (rideData) => API.post('/rides/bid', rideData);
export const getRides = () => API.get('/rides');
export const getUserRides = () => API.get('/rides/user');
export const acceptBid = (data) => API.post('/rides/accept', data);
