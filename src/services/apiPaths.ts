export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3082';

export const USERS_PATH = '/users';
export const AUTH_PATH = '/auth';
export const PRODUCTS_PATH = '/products';

export const REGISTER_USER_ENDPOINT = `${API_BASE}${USERS_PATH}/create`;
export const LOGIN_USER_ENDPOINT = `${API_BASE}${AUTH_PATH}/login`;

export const GET_PRODUCTS_ENDPOINT = `${API_BASE}${PRODUCTS_PATH}/get-products`;
export const GET_PRODUCTS_AVAILABLE_ENDPOINT = `${API_BASE}${PRODUCTS_PATH}/get-products-available`;
export const GET_PRODUCT_ENDPOINT = (id: number) => `${API_BASE}${PRODUCTS_PATH}/get-product/${id}`;
export const CREATE_PRODUCT_ENDPOINT = `${API_BASE}${PRODUCTS_PATH}/create`;
export const DELETE_PRODUCT_ENDPOINT = (id: number) => `${API_BASE}${PRODUCTS_PATH}/delete/${id}`;
export const UPDATE_PRODUCT_ENDPOINT = (id: number) => `${API_BASE}${PRODUCTS_PATH}/update/${id}`;