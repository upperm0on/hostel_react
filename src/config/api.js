// API Configuration
// This file centralizes API endpoint configuration for easier environment management

// Get the base URL from environment variables or use relative path
const getBaseURL = () => {
  // If VITE_API_BASE_URL is set, use it; otherwise default to local backend
  // This allows for easy switching between development and production
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: '/hq/api/login/',
  SIGNUP: '/hq/api/signup/',
  LANDING_PAGE: '/hq/api/landing_page/',
  
  // Hostel endpoints
  HOSTELS: '/hq/api/hostels/',
  SEARCH_REQUEST: '/hq/api/search_request/',
  
  // Payment endpoints
  PAYMENTS: '/hq/api/payments/',
  PAYMENT_VERIFY: '/hq/api/payments/verify/',
  CONSUMER_REQUEST: '/hq/api/payments/consumer_request/',
  
  // Media endpoints
  MEDIA_BASE: '/media/',
  ROOM_IMAGES: '/media/room_images',
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  const baseURL = getBaseURL();
  return `${baseURL}${endpoint}`;
};

// Helper function to build media URLs
export const buildMediaUrl = (path) => {
  const baseURL = getBaseURL();
  return `${baseURL}${path}`;
};

// Environment variable usage:
// - VITE_API_BASE_URL not set: Uses http://localhost:8080 by default
// - VITE_API_BASE_URL=http://localhost:8000: Uses absolute URLs
// - VITE_API_BASE_URL=https://api.example.com: Uses production URLs

// Default export for easy importing
export default {
  endpoints: API_ENDPOINTS,
  buildApiUrl,
  buildMediaUrl,
  getBaseURL,
};
