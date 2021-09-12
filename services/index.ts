import axios from 'axios';

// Axios configuration

export const storeApi = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0/',
  timeout: 5000,
});

// Routes

export const freeRoute = 'deals?upperPrice=0';
export const storeRoute = 'stores';
export const redirectRoute = 'https://www.cheapshark.com/redirect?dealID=';
