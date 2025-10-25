import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAuth, logout } from '../store/slices/authSlice';

// Clean auth hook with proper error handling
export const useAuthData = () => {
  const dispatch = useDispatch();
  
  // Select from Redux state
  const authState = useSelector(state => state.auth);
  const { isAuthenticated, token, email, user, loading, error, initialized } = authState;

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const initializeFromStorage = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');
        const storedUser = localStorage.getItem('userData');

        console.log('🔐 Initializing auth from localStorage:', { 
          hasToken: !!storedToken, 
          hasEmail: !!storedEmail,
          hasUser: !!storedUser 
        });

        if (storedToken) {
          dispatch(initializeAuth({
            token: storedToken,
            email: storedEmail || null,
            user: storedUser ? JSON.parse(storedUser) : null
          }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error initializing auth from localStorage:', error);
        // Clear invalid data and logout
        localStorage.clear();
        dispatch(logout());
      }
    };

    initializeFromStorage();
  }, [dispatch]);

  // Helper functions for external use
  const login = (authData) => {
    try {
      // Save to localStorage
      localStorage.setItem('token', authData.token);
      if (authData.email) localStorage.setItem('email', authData.email);
      if (authData.user) localStorage.setItem('userData', JSON.stringify(authData.user));
      
      // Update Redux
      dispatch(initializeAuth(authData));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const logoutUser = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userData');
      localStorage.removeItem('information');
      localStorage.removeItem('reservation_data');
      
      // Update Redux
      dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    isAuthenticated,
    token,
    email,
    user,
    loading,
    error,
    initialized,
    login,
    logout: logoutUser,
  };
};
