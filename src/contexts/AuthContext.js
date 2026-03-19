

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