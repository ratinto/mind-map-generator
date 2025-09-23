// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// API utility functions
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get authentication headers
  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic API request method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      credentials: 'include', // Include cookies for Django sessions
      headers: this.getAuthHeaders(),
      ...options,
    };

    // Merge headers if provided in options
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors - only clear session on explicit 401
        if (response.status === 401) {
          // Check if it's actually an auth error, not just network issue
          try {
            // Only clear session if we can confirm it's a real 401
            if (data.detail && (data.detail.includes('Invalid') || data.detail.includes('expired') || data.detail.includes('unauthorized'))) {
              localStorage.removeItem('user_id');
              localStorage.removeItem('username');
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              // Only redirect if we're not already on the login page
              if (!window.location.pathname.includes('/login') && !window.location.pathname === '/') {
                window.location.href = '/';
              }
            }
          } catch (e) {
            // If we can't parse the error, assume it's a real 401
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            if (!window.location.pathname.includes('/login') && !window.location.pathname === '/') {
              window.location.href = '/';
            }
          }
        }
        
        throw new Error(data.error || data.detail || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return { success: false, error: error.message };
    }
  }

  // Authentication methods
  async login(username, password) {
    return this.makeRequest('/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(username, email, password) {
    return this.makeRequest('/register/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async getUserProfile() {
    return this.makeRequest('/profile/');
  }

  // MindMap methods
  async getMindMaps() {
    const userId = localStorage.getItem('user_id');
    const endpoint = userId ? `/mindmaps/?user_id=${userId}` : '/mindmaps/';
    const result = await this.makeRequest(endpoint);
    
    // Handle paginated response from Django REST framework
    if (result.success && result.data && typeof result.data === 'object' && result.data.results) {
      return { success: true, data: result.data.results };
    }
    
    return result;
  }

  async getMindMap(id) {
    return this.makeRequest(`/mindmaps/${id}/`);
  }

  async createMindMap(mindMapData) {
    const userId = localStorage.getItem('user_id');
    const body = { ...mindMapData };
    
    // Include user_id in the request body for backend association
    if (userId) {
      body.user_id = userId;
    }

    return this.makeRequest('/mindmaps/', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async updateMindMap(id, mindMapData) {
    const userId = localStorage.getItem('user_id');
    const body = { ...mindMapData };
    
    // Include user_id in the request body
    if (userId) {
      body.user_id = userId;
    }

    return this.makeRequest(`/mindmaps/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async deleteMindMap(id) {
    return this.makeRequest(`/mindmaps/${id}/`, {
      method: 'DELETE',
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;

// Named exports for convenience
export const {
  login,
  register,
  getUserProfile,
  getMindMaps,
  getMindMap,
  createMindMap,
  updateMindMap,
  deleteMindMap,
} = apiService;
