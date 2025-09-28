import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Medicine API calls
export const medicineAPI = {
    getMedicines: (params = {}) => api.get('/medicines', { params }),
    getMedicine: (id) => api.get(`/medicines/${id}`),
    createMedicine: (medicineData) => api.post('/medicines', medicineData),
    updateMedicine: (id, medicineData) => api.put(`/medicines/${id}`, medicineData),
    deleteMedicine: (id) => api.delete(`/medicines/${id}`),
    searchMedicines: (searchTerm, params = {}) =>
        api.get('/medicines', { params: { search: searchTerm, ...params } }),
};

// Category API calls
export const categoryAPI = {
    getCategories: () => api.get('/categories'),
    getCategory: (id) => api.get(`/categories/${id}`),
    createCategory: (categoryData) => api.post('/categories', categoryData),
    updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
    deleteCategory: (id) => api.delete(`/categories/${id}`),
};

// Health check
export const healthAPI = {
    check: () => api.get('/health'),
};

export default api;
