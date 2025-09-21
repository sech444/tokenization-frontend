// tokenization-frontend/src/hooks/useWalletAuth.js

import { useState, useCallback } from 'react';
import { useWalletAuth as useWeb3Context } from '../contexts/Web3Context'; // Renamed import to avoid conflict

/**
 * Custom hook for wallet authentication
 * Wraps the Web3Context with additional utilities and error handling
 */
export const useWalletAuth = () => {
  const {
    account,
    isConnecting,
    isAuthenticated,
    user,
    error,
    chainId,
    balance,
    connectWallet,
    authenticateWallet,
    connectAndAuthenticate,
    linkWalletToAccount,
    disconnect,
    switchNetwork,
    isMetaMaskInstalled,
    getFormattedBalance,
    isOnCorrectNetwork,
    getNetworkName,
    signMessage,
    setError,
  } = useWeb3Context(); // Using renamed import

  const [isLoading, setIsLoading] = useState(false);

  // Connect wallet with enhanced error handling
  const handleConnectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await connectWallet();
      if (!success) {
        throw new Error('Failed to connect wallet');
      }
      return true;
    } catch (err) {
      console.error('Wallet connection error:', err);
      const errorMessage = err.code === 4001 
        ? 'Connection rejected by user' 
        : (err.message || 'Failed to connect wallet');
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connectWallet, setError]);

  // Authenticate with backend
  const handleAuthenticate = useCallback(async () => {
    if (!account) {
      setError('Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await authenticateWallet();
      if (!success) {
        throw new Error('Failed to authenticate with wallet');
      }
      return true;
    } catch (err) {
      console.error('Wallet authentication error:', err);
      setError(err.message || 'Failed to authenticate wallet');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [account, authenticateWallet, setError]);

  // Connect and authenticate in one step
  const handleConnectAndAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await connectAndAuthenticate();
      if (!success) {
        throw new Error('Failed to connect and authenticate wallet');
      }
      return true;
    } catch (err) {
      console.error('Wallet connect and auth error:', err);
      const errorMessage = err.code === 4001 
        ? 'Connection rejected by user' 
        : (err.message || 'Failed to connect and authenticate wallet');
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connectAndAuthenticate, setError]);

  // Link wallet to existing account
  const handleLinkWallet = useCallback(async () => {
    if (!account) {
      setError('Please connect your wallet first');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await linkWalletToAccount();
      if (!success) {
        throw new Error('Failed to link wallet to account');
      }
      return true;
    } catch (err) {
      console.error('Wallet linking error:', err);
      setError(err.message || 'Failed to link wallet to account');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [account, linkWalletToAccount, setError]);

  // Disconnect wallet
  const handleDisconnect = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await disconnect();
      return true;
    } catch (err) {
      console.error('Wallet disconnect error:', err);
      setError(err.message || 'Failed to disconnect wallet');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [disconnect, setError]);

  // Switch to correct network
  const handleSwitchNetwork = useCallback(async (chainId) => {
    setIsLoading(true);
    setError(null);

    try {
      await switchNetwork(chainId);
      return true;
    } catch (err) {
      console.error('Network switch error:', err);
      let errorMessage = 'Failed to switch network';
      
      if (err.code === 4902) {
        errorMessage = 'Network not added to MetaMask. Please add it manually.';
      } else if (err.code === 4001) {
        errorMessage = 'Network switch rejected by user';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [switchNetwork, setError]);

  // Sign message with error handling
  const handleSignMessage = useCallback(async (message) => {
    if (!account) {
      setError('Please connect your wallet first');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const signature = await signMessage(message);
      return signature;
    } catch (err) {
      console.error('Message signing error:', err);
      const errorMessage = err.code === 4001 
        ? 'Signature rejected by user' 
        : (err.message || 'Failed to sign message');
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [account, signMessage, setError]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Get connection status
  const getConnectionStatus = useCallback(() => {
    if (!isMetaMaskInstalled()) {
      return 'metamask_not_installed';
    }
    if (!account) {
      return 'not_connected';
    }
    if (!isOnCorrectNetwork()) {
      return 'wrong_network';
    }
    if (!isAuthenticated) {
      return 'connected_not_authenticated';
    }
    return 'fully_connected';
  }, [isMetaMaskInstalled, account, isOnCorrectNetwork, isAuthenticated]);

  // Get user display name
  const getUserDisplayName = useCallback(() => {
    if (!user) return null;
    
    // Priority: firstName + lastName > username > email > short address
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.username) {
      return user.username;
    }
    if (user.email) {
      return user.email.split('@')[0]; // Just the part before @
    }
    if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
    return 'Unknown User';
  }, [user, account]);

  // Get shortened wallet address
  const getShortAddress = useCallback(() => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return hasRole('admin') || hasRole('super_admin');
  }, [hasRole]);

  // Get user permissions based on role
  const getUserPermissions = useCallback(() => {
    if (!user?.role) return [];
    
    const rolePermissions = {
      'super_admin': ['all'],
      'admin': ['manage_users', 'manage_tokens', 'manage_marketplace', 'view_analytics'],
      'manager': ['manage_tokens', 'view_analytics'],
      'creator': ['create_tokens', 'manage_own_tokens'],
      'user': ['trade_tokens', 'view_marketplace'],
    };

    return rolePermissions[user.role] || ['basic'];
  }, [user]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    const permissions = getUserPermissions();
    return permissions.includes('all') || permissions.includes(permission);
  }, [getUserPermissions]);

  // Check if authentication is expiring soon
  const isAuthExpiringSoon = useCallback((thresholdMinutes = 15) => {
    if (!user?.expiresAt) return false;
    
    const expirationTime = new Date(user.expiresAt);
    const now = new Date();
    const timeDiff = expirationTime.getTime() - now.getTime();
    const minutesLeft = timeDiff / (1000 * 60);
    
    return minutesLeft < thresholdMinutes && minutesLeft > 0;
  }, [user]);

  // Get wallet information object
  const getWalletInfo = useCallback(() => {
    return {
      address: account,
      shortAddress: getShortAddress(),
      chainId,
      networkName: getNetworkName(),
      balance,
      formattedBalance: getFormattedBalance(),
      isConnected: !!account,
      isAuthenticated,
      isOnCorrectNetwork: isOnCorrectNetwork(),
      connectionStatus: getConnectionStatus(),
    };
  }, [account, chainId, balance, isAuthenticated, getShortAddress, getNetworkName, getFormattedBalance, isOnCorrectNetwork, getConnectionStatus]);

  // Get user information object
  const getUserInfo = useCallback(() => {
    if (!user) return null;
    
    return {
      ...user,
      displayName: getUserDisplayName(),
      permissions: getUserPermissions(),
      isAdmin: isAdmin(),
      isAuthExpiringSoon: isAuthExpiringSoon(),
    };
  }, [user, getUserDisplayName, getUserPermissions, isAdmin, isAuthExpiringSoon]);

  return {
    // State
    account,
    isConnecting: isConnecting || isLoading,
    isAuthenticated,
    user,
    error,
    chainId,
    balance,

    // Enhanced actions with error handling
    connectWallet: handleConnectWallet,
    authenticate: handleAuthenticate,
    connectAndAuthenticate: handleConnectAndAuth,
    linkWallet: handleLinkWallet,
    disconnect: handleDisconnect,
    switchNetwork: handleSwitchNetwork,
    signMessage: handleSignMessage,
    clearError,

    // Original Web3Context utilities
    isMetaMaskInstalled,
    getFormattedBalance,
    isOnCorrectNetwork,
    getNetworkName,

    // Additional utilities
    getConnectionStatus,
    getUserDisplayName,
    getShortAddress,
    hasRole,
    isAdmin,
    getUserPermissions,
    hasPermission,
    isAuthExpiringSoon,
    getWalletInfo,
    getUserInfo,

    // Computed values for convenience
    connectionStatus: getConnectionStatus(),
    userDisplayName: getUserDisplayName(),
    shortAddress: getShortAddress(),
    walletInfo: getWalletInfo(),
    userInfo: getUserInfo(),
  };
};

export default useWalletAuth;