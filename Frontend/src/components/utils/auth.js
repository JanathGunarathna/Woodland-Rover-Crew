import axios from 'axios';

// Define API base URL - better to use environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Define user roles as constants
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  LEADER: 'leader'
};

// Configure axios instance with default config
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for handling cookies/sessions
});

// Intercept responses to handle token refresh or logout on 401
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login if unauthorized
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const response = await authApi.post('/api/login', {
      email,
      password
    });

    if (response.data.user) {
      // Validate user object has required fields
      const { id, email } = response.data.user;
      if (!id || !email ) {
        throw new Error('Invalid user data received');
      }

      // Store user data
      const userData = {
        id,
        email,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('user', JSON.stringify(userData));

      return response.data;
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    if (error.response) {
      // Handle different error status codes
      switch (error.response.status) {
        case 400:
          throw new Error('Invalid email or password format');
        case 401:
          throw new Error('Invalid credentials');
        case 429:
          throw new Error('Too many login attempts. Please try again later');
        case 503:
          throw new Error('Service temporarily unavailable');
        default:
          throw new Error(error.response.data?.message || 'Login failed');
      }
    }
    throw new Error('Network error. Please check your connection');
  }
};

export const logout = async () => {
  try {
    await authApi.post('/api/logout');
  } finally {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    // Check if user data is expired (optional, e.g., 24 hours)
    const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (new Date().getTime() - user.timestamp > EXPIRY_TIME) {
      localStorage.removeItem('user');
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
    return null;
  }
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user?.role === requiredRole;
};