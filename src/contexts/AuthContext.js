// // src/contexts/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { authAPI } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   // ALL HOOKS MUST BE DECLARED FIRST - BEFORE ANY CONDITIONALS OR RETURNS
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authMethod, setAuthMethod] = useState(null); // Added missing state

//   // Initialize auth state on component mount
//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   // Helper function for role checking
//   const isAdminRole = (role) => {
//     return role && role.toLowerCase() === 'admin';
//   };

//   const initializeAuth = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Consistent key name
//       const storedUser = localStorage.getItem('user');
//       const storedAuthMethod = localStorage.getItem('authMethod');
      
//       if (!token || !storedUser) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const userData = JSON.parse(storedUser);
        
//         // Simple token validation - you can enhance this
//         if (token.length > 10) { // Basic validation
//           setUser(userData);
//           setIsAuthenticated(true);
//           setAuthMethod(storedAuthMethod || 'email');
//           console.log('User restored from localStorage:', userData);
//         } else {
//           // Invalid token format
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           localStorage.removeItem('authMethod');
//         }
//       } catch (parseError) {
//         console.error('Error parsing stored user data:', parseError);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('authMethod');
//       }
//     } catch (error) {
//       console.error('Auth initialization error:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('authMethod');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Regular email/password login
//   const login = async (email, password) => {
//     try {
//       setLoading(true);
//       console.log('Attempting email login for:', email);

//       const result = await authAPI.login(email, password);
      
//       if (!result || !result.success) {
//         return {
//           success: false,
//           error: result?.error || 'Login failed'
//         };
//       }

//       // Create user object from API response
//       const userData = {
//         id: result.user_id || result.id,
//         email: result.email,
//         first_name: result.first_name,
//         last_name: result.last_name,
//         username: result.username,
//         role: result.role,
//       };

//       // Store in localStorage with consistent key names
//       localStorage.setItem('token', result.token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('authMethod', 'email');
      
//       // Update state
//       setUser(userData);
//       setIsAuthenticated(true);
//       setAuthMethod('email');

//       console.log('Email login successful:', userData);
//       return {
//         success: true,
//         user: userData,
//         token: result.token
//       };

//     } catch (error) {
//       console.error('Email login error:', error);
//       return {
//         success: false,
//         error: error.message || 'Login failed'
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Web3 wallet login
//   const loginWithWallet = async (walletAddress, signMessage) => {
//     try {
//       setLoading(true);
//       console.log('Starting wallet login for:', walletAddress);

//       // Step 1: Get nonce from server
//       const nonceResult = await authAPI.getWalletNonce(walletAddress);
      
//       if (!nonceResult?.success) {
//         throw new Error(nonceResult?.error || 'Failed to get authentication nonce');
//       }

//       const { nonce } = nonceResult;
//       console.log('Got nonce:', nonce);

//       // Step 2: Create and sign message
//       const message = `Please sign this message to authenticate with TokenPlatform.\n\nNonce: ${nonce}\nAddress: ${walletAddress}`;
      
//       let signature;
//       try {
//         signature = await signMessage(message);
//         console.log('Got signature');
//       } catch (signError) {
//         console.error('Signature error:', signError);
//         throw new Error('Failed to sign message. Please approve the signature request.');
//       }

//       // Step 3: Verify signature with server
//       const verifyResult = await authAPI.verifyWalletSignature({
//         wallet_address: walletAddress,
//         signature: signature,
//         message: message,
//         nonce: nonce
//       });

//       if (!verifyResult?.success) {
//         throw new Error(verifyResult?.error || 'Wallet verification failed');
//       }

//       // Create user object
//       const userData = {
//         id: verifyResult.user_id || verifyResult.id,
//         wallet_address: walletAddress,
//         email: verifyResult.email,
//         first_name: verifyResult.first_name,
//         last_name: verifyResult.last_name,
//         username: verifyResult.username || `wallet_${walletAddress.slice(0, 8)}`,
//         role: verifyResult.role,
//       };

//       // Store in localStorage
//       localStorage.setItem('token', verifyResult.token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('authMethod', 'web3');
      
//       // Update state
//       setUser(userData);
//       setIsAuthenticated(true);
//       setAuthMethod('web3');

//       console.log('Wallet login successful:', userData);
//       return {
//         success: true,
//         user: userData,
//         token: verifyResult.token
//       };

//     } catch (error) {
//       console.error('Wallet login error:', error);
      
//       // Clear any partial state
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('authMethod');

//       return {
//         success: false,
//         error: error.message || 'Wallet authentication failed'
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Social login (OAuth)
//   const loginWithSocial = async (provider, code) => {
//     try {
//       setLoading(true);
//       console.log(`Attempting ${provider} login...`);

//       const result = await authAPI.socialLogin(provider, code);
      
//       if (!result?.success) {
//         return {
//           success: false,
//           error: result?.error || `${provider} login failed`
//         };
//       }

//       // Create user object
//       const userData = {
//         id: result.user_id || result.id,
//         email: result.email,
//         first_name: result.first_name,
//         last_name: result.last_name,
//         username: result.username,
//         role: result.role,
//         social_provider: provider,
//         avatar_url: result.avatar_url,
//       };

//       // Store in localStorage
//       localStorage.setItem('token', result.token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('authMethod', 'social');
      
//       // Update state
//       setUser(userData);
//       setIsAuthenticated(true);
//       setAuthMethod('social');

//       console.log(`${provider} login successful:`, userData);
//       return {
//         success: true,
//         user: userData,
//         token: result.token
//       };

//     } catch (error) {
//       console.error(`${provider} login error:`, error);
//       return {
//         success: false,
//         error: error.message || `${provider} login failed`
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         // Notify server of logout (optional)
//         await authAPI.logout(token).catch(console.error);
//       }
//     } catch (error) {
//       console.error('Logout API call failed:', error);
//     } finally {
//       // Clear local state regardless of API call result
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('authMethod');
      
//       setUser(null);
//       setIsAuthenticated(false);
//       setAuthMethod(null);
      
//       console.log('User logged out');
//     }
//   };

//   // User registration function
// const register = async (userData) => {
//   try {
//     setLoading(true);
//     console.log('Attempting user registration:', userData.email);

//     // Call the API register function
//     const result = await authAPI.register(userData);
    
//     // Your API returns the data directly, not wrapped in a success object
//     // So we need to handle it differently than login
//     if (!result) {
//       return {
//         success: false,
//         error: 'Registration failed - no response from server'
//       };
//     }
    

//     // Create user object from API response
//     const newUser = {
//       id: result.user_id || result.id,
//       email: result.email,
//       first_name: result.first_name,
//       last_name: result.last_name,
//       username: result.username,
//       role: result.role || 'user',
//     };

//     // Store in localStorage with consistent key names
//     if (result.token) {
//       localStorage.setItem('token', result.token);
//       localStorage.setItem('user', JSON.stringify(newUser));
//       localStorage.setItem('authMethod', 'email');
      
//       // Update state
//       setUser(newUser);
//       setIsAuthenticated(true);
//       setAuthMethod('email');
//     }

//     console.log('Registration successful:', newUser);
//     return {
//       success: true,
//       user: newUser,
//       token: result.token
//     };

//   } catch (error) {
//     console.error('Registration error:', error);
    
//     // Handle different error types from your API
//     let errorMessage = 'Registration failed';
    
//     if (error.message) {
//       errorMessage = error.message;
//     } else if (typeof error === 'string') {
//       errorMessage = error;
//     }
    
//     return {
//       success: false,
//       error: errorMessage
//     };
//   } finally {
//     setLoading(false);
//   }
// };

// // Then update your context value object to include the register function:
// const value = {
//   user,
//   loading,
//   isAuthenticated,
//   authMethod,
//   login,
//   register, // Add this line
//   loginWithWallet,
//   loginWithSocial,
//   logout,
//   isAdminRole
// };
//   // Return provider - this must come after all hooks
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);             // {id,email,role,...}
  const [loading, setLoading] = useState(true);       // auth loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState(null); // 'email' | 'web3' | 'social'

  useEffect(() => {
    initializeAuth();
  }, []);

  const isAdminRole = (role) => role && role.toLowerCase() === 'admin';

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedAuthMethod = localStorage.getItem('authMethod');

      setAuthMethod(storedAuthMethod || null);

      // Nothing stored
      if (!token || !storedUser) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // If this is a wallet session, let Web3Context handle it (avoid clearing)
      if (storedAuthMethod === 'web3') {
        setUser(null);
        setIsAuthenticated(false);
        return; // Web3Context will restore
      }

      // For email/social sessions, verify token by just ensuring the request does not throw
      try {
        await authAPI.verifyToken(token); // If this throws, token is invalid
      } catch {
        // Invalid token -> clear
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authMethod');
        setUser(null);
        setIsAuthenticated(false);
        setAuthMethod(null);
        return;
      }

      // If verify did not throw, accept stored session
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Auth init error:', e);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authMethod');
      setUser(null);
      setIsAuthenticated(false);
      setAuthMethod(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuth = async () => {
    setLoading(true);
    await initializeAuth();
  };

  const login = async (emailOrObj, passwordOpt) => {
    try {
      setLoading(true);
      const email = typeof emailOrObj === 'string' ? emailOrObj : emailOrObj?.email;
      const password = typeof emailOrObj === 'string' ? passwordOpt : emailOrObj?.password;

      const result = await authAPI.login({ email, password });
      // Accept success if a token exists (don’t rely on result.success field)
      const success = !!result?.token;
      if (!success) {
        return { success: false, error: result?.error || 'Login failed' };
      }

      const rawUser = result.user || result;
      const userData = {
        id: rawUser.user_id || rawUser.id,
        email: rawUser.email,
        first_name: rawUser.first_name,
        last_name: rawUser.last_name,
        username: rawUser.username,
        role: rawUser.role || 'user',
        wallet_address: rawUser.wallet_address,
      };

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authMethod', 'email');

      setUser(userData);
      setIsAuthenticated(true);
      setAuthMethod('email');

      return { success: true, user: userData, token: result.token };
    } catch (e) {
      console.error('Email login error:', e);
      return { success: false, error: e.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await authAPI.register(userData);
      if (!result) return { success: false, error: 'Registration failed' };

      const newUser = {
        id: result.user_id || result.id,
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        username: result.username,
        role: result.role || 'user',
      };

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('authMethod', 'email');
        setUser(newUser);
        setIsAuthenticated(true);
        setAuthMethod('email');
      }

      return { success: true, user: newUser, token: result.token };
    } catch (e) {
      console.error('Registration error:', e);
      return { success: false, error: e.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) await authAPI.logout(token).catch(() => {});
    } catch (e) {
      console.error('Logout API error:', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authMethod');
      setUser(null);
      setIsAuthenticated(false);
      setAuthMethod(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    authMethod,
    login,
    register,
    logout,
    refreshAuth,
    isAdminRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};