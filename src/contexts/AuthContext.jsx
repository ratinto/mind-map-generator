import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const username = localStorage.getItem('username');
      
      if (userId && accessToken) {
        // First, set the user data from localStorage to avoid showing login screen
        setUser({
          id: userId,
          username: username || 'User',
        });
        setIsAuthenticated(true);
        
        // Then verify the session with backend (optional verification)
        try {
          // Create a timeout promise for better browser compatibility
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 5000);
          });
          
          const fetchPromise = fetch('http://127.0.0.1:8000/api/profile/', {
            credentials: 'include', // Include cookies for session
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          const response = await Promise.race([fetchPromise, timeoutPromise]);

          if (response.ok) {
            const userData = await response.json();
            // Update with fresh data from backend
            setUser(userData);
            setIsAuthenticated(true);
          } else if (response.status === 401) {
            // Only clear on explicit 401 - token is actually invalid
            localStorage.removeItem('user_id');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('username');
            setUser(null);
            setIsAuthenticated(false);
          }
          // For other errors (network, 500, etc.), keep the localStorage session
        } catch (profileError) {
          // Network error during profile check - keep the localStorage session
          // Keep the user logged in with cached data
        }
      } else {
        // No stored credentials
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Check if we have stored credentials - if so, keep them and just set loading to false
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const username = localStorage.getItem('username');
      
      if (userId && accessToken) {
        // Keep the session even if there was an error
        setUser({
          id: userId,
          username: username || 'User',
        });
        setIsAuthenticated(true);
      } else {
        // Only clear if there are no stored credentials
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        credentials: 'include', // Include cookies for session
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication data
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        
        // Set user data
        setUser({
          id: data.user_id,
          username: data.username,
        });
        setIsAuthenticated(true);
        
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Note: Django sessions are managed server-side, 
      // they'll expire naturally or can be cleared on logout endpoint if needed
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
