// src/services/api.js - Fixed Web3 Authentication Headers

// 1. Fix the API base URL to match your backend port
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Example: makeRequest for public APIs
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Example: makeAuthenticatedRequest for protected APIs
async function makeAuthenticatedRequest(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  return makeRequest(url, { ...options, headers });
}

// 2. Fix the token storage key to be consistent
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Use consistent token key - 'token'
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Check if response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    let data = null;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle non-JSON responses (like plain text errors)
      const textResponse = await response.text();
      if (textResponse) {
        // Try to create a structured error object
        data = { message: textResponse, error: true };
      }
    }
    
    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// ============================================================================
// PROJECT API
// ============================================================================
export const projectAPI = {
  // Get all projects with filters
  getProjects: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.project_type) params.append('project_type', filters.project_type);
    if (filters.location) params.append('location', filters.location);
    if (filters.min_investment) params.append('min_investment', filters.min_investment);
    if (filters.max_investment) params.append('max_investment', filters.max_investment);
    if (filters.risk_level) params.append('risk_level', filters.risk_level);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiRequest(`/api/projects?${params.toString()}`, {
      method: 'GET'
    });
  },

  // Get project by ID
  getProject: (projectId) =>
    apiRequest(`/api/projects/${projectId}`, {
      method: 'GET'
    }),

  // Create new project
  createProject: (projectData) =>
    apiRequest('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    }),

  // Update project
  updateProject: (projectId, projectData) =>
    apiRequest(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    }),

  // Delete project
  deleteProject: (projectId) =>
    apiRequest(`/api/projects/${projectId}`, {
      method: 'DELETE'
    }),

  // Get user's projects
  getUserProjects: (userId) =>
    apiRequest(`/api/projects/user/${userId}`, {
      method: 'GET'
    }),

  // Invest in a project
  investInProject: (projectId, investmentData) =>
    apiRequest(`/api/projects/${projectId}/invest`, {
      method: 'POST',
      body: JSON.stringify(investmentData)
    }),

  // Get project investments
  getProjectInvestments: (projectId) =>
    apiRequest(`/api/projects/${projectId}/investments`, {
      method: 'GET'
    }),

  // Get project financial data
  getProjectFinancials: (projectId) =>
    apiRequest(`/api/projects/${projectId}/financials`, {
      method: 'GET'
    }),

  // Update project status
  updateProjectStatus: (projectId, status) =>
    apiRequest(`/api/projects/${projectId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),

  // Get project analytics
  getProjectAnalytics: (projectId) =>
    apiRequest(`/api/projects/${projectId}/analytics`, {
      method: 'GET'
    }),

  // Upload project documents
  uploadProjectDocument: (projectId, formData) =>
    apiRequest(`/api/projects/${projectId}/documents`, {
      method: 'POST',
      body: formData,
      headers: {} // Don't set Content-Type for FormData
    }),

  // Get project documents
  getProjectDocuments: (projectId) =>
    apiRequest(`/api/projects/${projectId}/documents`, {
      method: 'GET'
    })
};

// Export the createProject function directly for backward compatibility
export const createProject = projectAPI.createProject;

// 3. Update authAPI to handle both calling patterns
export const authAPI = {
  // Support both patterns: login(email, password) and login(credentials)
  login: (emailOrCredentials, password = null) => {
    let credentials;
    
    // Handle both calling patterns
    if (typeof emailOrCredentials === 'string' && password) {
      // Called as login(email, password)
      credentials = {
        email: emailOrCredentials,
        password: password
      };
    } else if (typeof emailOrCredentials === 'object') {
      // Called as login(credentials)
      credentials = emailOrCredentials;
    } else {
      throw new Error('Invalid login parameters');
    }
    
    console.log('Login API called with credentials:', { email: credentials.email, password: '***' });
    
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  socialLogin: (provider, code) =>
    apiRequest(`/api/auth/social/${provider}/callback`, {
      method: 'POST',
      body: JSON.stringify({
        code: code
      })
    }),

  // Keep all your existing methods...
  register: (userData) => 
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  verifyToken: (token) => 
    apiRequest('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token })
    }),

  logout: () => 
    apiRequest('/api/auth/logout', {
      method: 'POST'
    }),

  changePassword: (passwordData) => 
    apiRequest('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData)
    }),

  // ============================================================================
  // WEB3 AUTHENTICATION METHODS - FIXED TO USE apiRequest
  // ============================================================================
  // Get nonce for wallet authentication (SIWE)
  getWalletNonce: async (address) => {
    try {
      const response = await apiRequest('/api/auth/wallet/nonce', {
        method: 'POST',
        body: JSON.stringify({ address }),
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to get wallet nonce');
      }

      return {
        success: true,
        nonce: response.nonce,
        message: response.message, // This is the formatted SIWE message to sign
      };
    } catch (error) {
      console.error('Get wallet nonce failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Legacy method name for backward compatibility
  getWeb3AuthMessage: async (address) => {
    return authAPI.getWalletNonce(address);
  },

  // Verify wallet signature and authenticate
  verifyWalletSignature: async (signatureData) => {
    try {
      const response = await apiRequest('/api/auth/wallet/verify', {
        method: 'POST',
        body: JSON.stringify(signatureData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Wallet signature verification failed');
      }

      return {
        success: true,
        token: response.token,
        user: response.user,
        expires_at: response.expires_at,
        message: response.message,
      };
    } catch (error) {
      console.error('Verify wallet signature failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Legacy method name for backward compatibility
  authenticateWeb3: async (signatureData) => {
    return authAPI.verifyWalletSignature(signatureData);
  },

  // Disconnect wallet
  disconnectWallet: async () => {
    try {
      const response = await apiRequest('/api/auth/wallet/disconnect', {
        method: 'POST',
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      console.error('Disconnect wallet failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Link wallet to existing user account
  linkWalletToUser: async (signatureData) => {
    try {
      const response = await makeAuthenticatedRequest('/api/auth/wallet/link', {
        method: 'POST',
        body: JSON.stringify(signatureData),
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      console.error('Link wallet to user failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Get wallet info
  getWalletInfo: async () => {
    try {
      const response = await makeAuthenticatedRequest('/api/auth/wallet/info', {
        method: 'GET',
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Get wallet info failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // ============================================================================
  // SOCIAL AUTHENTICATION METHODS
  // ============================================================================

  // Get social login URL for OAuth flow
  getSocialLoginUrl: (provider, redirectUri = null) => {
    const params = new URLSearchParams();
    if (redirectUri) {
      params.append('redirect_uri', redirectUri);
    }
    
    return apiRequest(`/api/auth/social/${provider}/url${params.toString() ? `?${params.toString()}` : ''}`, {
      method: 'GET'
    });
  },

  // Complete social authentication with auth code
  loginWithSocial: (socialData) =>
    apiRequest(`/api/auth/social/${socialData.provider}`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: socialData.auth_code,
        redirect_uri: socialData.redirect_uri
      })
    }),

  // Link social account to existing user
  linkSocialAccount: (socialData) =>
    apiRequest(`/api/auth/social/${socialData.provider}/link`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: socialData.auth_code,
        redirect_uri: socialData.redirect_uri
      })
    }),

  // Unlink social account
  unlinkSocialAccount: (provider) =>
    apiRequest(`/api/auth/social/${provider}/unlink`, {
      method: 'DELETE'
    }),

  // Get user's connected accounts
  getConnectedAccounts: () =>
    apiRequest('/api/auth/connected-accounts', {
      method: 'GET'
    }),

  // ============================================================================
  // ADDITIONAL AUTH METHODS
  // ============================================================================

  // Forgot password
  forgotPassword: (email) =>
    apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  // Reset password with token
  resetPassword: (resetData) =>
    apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData)
    }),

  // Verify email address
  verifyEmail: (token) =>
    apiRequest('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token })
    }),

  // Resend email verification
  resendVerificationEmail: () =>
    apiRequest('/api/auth/resend-verification', {
      method: 'POST'
    })
};

// ============================================================================
// USER API
// ============================================================================
export const userAPI = {
  // Get current user profile
  getProfile: () =>
    apiRequest('/api/user/profile', {
      method: 'GET'
    }),

  // Update user profile
  updateProfile: (userData) =>
    apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    }),

  // Get user by ID
  getUser: (userId) =>
    apiRequest(`/api/user/${userId}`, {
      method: 'GET'
    }),

  // Upload avatar
  uploadAvatar: (formData) =>
    apiRequest('/api/user/avatar', {
      method: 'POST',
      body: formData,
      headers: {} // Don't set Content-Type for FormData
    })
};

// ============================================================================
// MARKETPLACE API
// ============================================================================
export const marketplaceAPI = {
  // Get all listings with filters
  getListings: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.token_id) params.append('token_id', filters.token_id);
    if (filters.listing_type) params.append('listing_type', filters.listing_type);
    if (filters.min_price) params.append('min_price', filters.min_price);
    if (filters.max_price) params.append('max_price', filters.max_price);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiRequest(`/api/marketplace/listings?${params.toString()}`, {
      method: 'GET'
    });
  },

  // Get listing by ID
  getListing: (listingId) =>
    apiRequest(`/api/marketplace/listings/${listingId}`, {
      method: 'GET'
    }),

  // Create a new listing
  createListing: (listingData) =>
    apiRequest('/api/marketplace/listings', {
      method: 'POST',
      body: JSON.stringify(listingData)
    }),

  // Update listing
  updateListing: (listingId, listingData) =>
    apiRequest(`/api/marketplace/listings/${listingId}`, {
      method: 'PUT',
      body: JSON.stringify(listingData)
    }),

  // Delete listing
  deleteListing: (listingId) =>
    apiRequest(`/api/marketplace/listings/${listingId}`, {
      method: 'DELETE'
    }),

  // Buy tokens from a listing
  buyTokens: (listingId, quantity) =>
    apiRequest('/api/marketplace/buy', {
      method: 'POST',
      body: JSON.stringify({
        listing_id: listingId,
        quantity: quantity
      })
    }),

  // Get user's orders
  getOrders: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.user_id) params.append('user_id', filters.user_id);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiRequest(`/api/marketplace/orders?${params.toString()}`, {
      method: 'GET'
    });
  },

  // Get order by ID
  getOrder: (orderId) =>
    apiRequest(`/api/marketplace/orders/${orderId}`, {
      method: 'GET'
    })
};

// ============================================================================
// TOKEN API
// ============================================================================
export const tokenAPI = {
  // Get all tokens
  getTokens: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiRequest(`/api/tokens?${params.toString()}`, {
      method: 'GET'
    });
  },

  // Get token by ID
  getToken: (tokenId) =>
    apiRequest(`/api/tokens/${tokenId}`, {
      method: 'GET'
    }),

  // Create new token
  createToken: (tokenData) =>
    apiRequest('/api/tokens', {
      method: 'POST',
      body: JSON.stringify(tokenData)
    }),

  // Update token
  updateToken: (tokenId, tokenData) =>
    apiRequest(`/api/tokens/${tokenId}`, {
      method: 'PUT',
      body: JSON.stringify(tokenData)
    }),

  // Delete token
  deleteToken: (tokenId) =>
    apiRequest(`/api/tokens/${tokenId}`, {
      method: 'DELETE'
    }),

  // Get user's tokens
  getUserTokens: (userId) =>
    apiRequest(`/api/tokens/user/${userId}`, {
      method: 'GET'
    })
};


// ============================================================================
// FIXED ADMIN API - Using Best Practices
// ============================================================================

// First, let's create a dedicated authenticated request function for admin APIs
const makeAdminRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token and validate it exists
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required - no token found');
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  };

  // Debug logging
  console.log('Admin API Request:', {
    url,
    method: config.method || 'GET',
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : 'none'
  });

  try {
    const response = await fetch(url, config);
    
    // Handle different content types
    const contentType = response.headers.get('content-type');
    let data = null;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const textResponse = await response.text();
      data = textResponse ? { message: textResponse, error: true } : null;
    }
    
    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP error! status: ${response.status}`;
      console.error('Admin API Error:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error(`Admin API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Updated Admin API with proper error handling and authentication
export const adminAPI = {
  // Get all users (with pagination, filters) - FIXED
  getUsers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);
      if (filters.role) params.append("role", filters.role);
      if (filters.status) params.append("status", filters.status);

      const endpoint = `/api/admin/users${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching users with endpoint:', endpoint);

      const data = await makeAdminRequest(endpoint, {
        method: "GET",
      });

      console.log('Users API response:', data);

      // Handle different response formats
      if (Array.isArray(data)) {
        return { users: data[0] || [], total: data[1] || 0 };
      } else if (data && typeof data === 'object') {
        // Handle object response formats
        if (data.users !== undefined) {
          // Handle your backend's response format: {users: [], total_count: 0, ...}
          return { 
            users: data.users, 
            total: data.total_count || data.total || data.users.length 
          };
        } else if (data.rows !== undefined && data.count !== undefined) {
          return { users: data.rows || [], total: data.count || 0 };
        } else if (Array.isArray(data.data)) {
          return { users: data.data, total: data.total || data.data.length };
        }
      }

      // If we can't parse it, return empty
      console.warn('Unexpected users API response format:', data);
      return { users: [], total: 0 };

    } catch (error) {
      console.error('getUsers failed:', error);
      throw error;
    }
  },

  // Update user role or status - FIXED
  updateUser: async (userId, updates) => {
    try {
      return await makeAdminRequest(`/api/admin/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('updateUser failed:', error);
      throw error;
    }
  },



  // Get pending KYC verifications - FIXED
  getKYC: async (filters = {}) => {
      try {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page);
        if (filters.limit) params.append("limit", filters.limit);

        // ✅ Always hit /pending
        // const endpoint = `/api/admin/kyc/pending${params.toString() ? `?${params.toString()}` : ''}`;
        // return await makeAdminRequest(endpoint, {
        //   method: "GET",
        // });
        // frontend src/services/api.js (adminAPI.getKYC)
        const endpoint = `/api/admin/kyc/pending${params.toString() ? `?${params.toString()}` : ''}`;
        return await makeAdminRequest(endpoint, { method: "GET" });

      } catch (error) {
        console.error('getKYC failed:', error);
        throw error;
      }
    },

  // Approve or reject a KYC - FIXED
  updateKYC: async (userId, approved, notes = null) => {
    try {
      return await makeAdminRequest(`/api/admin/kyc/approve`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId, approved, notes }),
      });
    } catch (error) {
      console.error('updateKYC failed:', error);
      throw error;
    }
  },



  // Additional debugging method
  testAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing admin auth with token:', token ? `${token.substring(0, 20)}...` : 'none');
      
      return await makeAdminRequest('/api/admin/test', {
        method: "GET",
      });
    } catch (error) {
      console.error('Admin auth test failed:', error);
      throw error;
    }
  }
};
  // ============================================================================
// TOKENIZATION & KYC API
// ============================================================================
export const tokenizationAPI = {
  // Tokenize a project (calls backend -> blockchain service)
  tokenizeProject: (projectId, tokenizationData) =>
    apiRequest(`/api/projects/${projectId}/tokenize`, {
      method: 'POST',
      body: JSON.stringify(tokenizationData)
    }),

  // Get tokenization status for a project
  getTokenizationStatus: (projectId) =>
    apiRequest(`/api/projects/${projectId}/tokenization-status`, {
      method: 'GET'
    }),

  // Verify KYC (user submits docs -> backend -> ComplianceManager)
  verifyUserKYC: (kycData) =>
    apiRequest('/api/kyc/verify', {
      method: 'POST',
      body: JSON.stringify(kycData)
    }),

  // Check if an address is KYC verified
  checkKYCStatus: (address) =>
    apiRequest(`/api/kyc/status/${address}`, {
      method: 'GET'
    }),


};




// Create a named object for the default export to fix ESLint warning
const apiServices = {
  auth: authAPI,
  user: userAPI,
  marketplace: marketplaceAPI,
  token: tokenAPI,
  project: projectAPI,
  admin: adminAPI,
  tokenization: tokenizationAPI, // ✅ added
};

// Export all APIs as default
export default apiServices;

