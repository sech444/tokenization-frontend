

// // src/contexts/Web3Context.js - Fixed isConnected state
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { BrowserProvider, formatEther } from 'ethers';
// import { authAPI } from '../services/api';

// const Web3Context = createContext();

// export const useWeb3 = () => {
//   const context = useContext(Web3Context);
//   if (!context) {
//     throw new Error('useWeb3 must be used within a Web3Provider');
//   }
//   return context;
// };

// // Alias for backwards compatibility
// export const useWalletAuth = useWeb3;

// // Normalize user shape so frontend always gets consistent fields
// const normalizeUser = (rawUser) => {
//   if (!rawUser) return null;

//   return {
//     id: rawUser.id,
//     email: rawUser.email || `${rawUser.wallet_address}@wallet.local`,
//     first_name: rawUser.first_name,
//     last_name: rawUser.last_name,
//     username:
//       rawUser.username ||
//       (rawUser.wallet_address
//         ? `wallet_${rawUser.wallet_address.slice(2, 10)}`
//         : null),
//     role: rawUser.role || 'user',
//     wallet_address: rawUser.wallet_address || null,
//   };
// };

// export const Web3Provider = ({ children }) => {
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [chainId, setChainId] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [error, setError] = useState(null);

//   // Authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [authenticationStep, setAuthenticationStep] = useState('idle');

//   // ✅ FIX: Add explicit isConnected state
//   const [isConnected, setIsConnected] = useState(false);

//   const clearError = () => setError(null);

//   const isMetaMaskInstalled = () => {
//     return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
//   };

//   const getNetworkName = (chainIdParam = chainId) => {
//     const networks = {
//       1: 'Ethereum Mainnet',
//       5: 'Goerli Testnet',
//       11155111: 'Sepolia Testnet',
//       137: 'Polygon Mainnet',
//       80001: 'Polygon Mumbai',
//       56: 'BSC Mainnet',
//       97: 'BSC Testnet',
//       1337: 'Localhost',
//       31337: 'Hardhat Network',
//     };
//     return networks[chainIdParam] || `Chain ID: ${chainIdParam}`;
//   };

//   const getFormattedBalance = () => {
//     if (!balance) return '0.0000';
//     return parseFloat(formatEther(balance)).toFixed(4);
//   };

//   const signMessage = async (message) => {
//     if (!signer) {
//       throw new Error('No signer available');
//     }
//     try {
//       setAuthenticationStep('signing');
//       return await signer.signMessage(message);
//     } finally {
//       setAuthenticationStep('idle');
//     }
//   };

//   const connectWallet = async () => {
//     if (!isMetaMaskInstalled()) {
//       throw new Error('MetaMask is not installed. Please install it.');
//     }

//     try {
//       setIsConnecting(true);
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       if (accounts.length === 0) throw new Error('No accounts found');

//       const web3Provider = new BrowserProvider(window.ethereum);
//       const web3Signer = await web3Provider.getSigner();
//       const network = await web3Provider.getNetwork();
//       const accountBalance = await web3Provider.getBalance(accounts[0]);

//       setAccount(accounts[0]);
//       setProvider(web3Provider);
//       setSigner(web3Signer);
//       setChainId(Number(network.chainId));
//       setBalance(accountBalance);
//       setIsConnected(true); // ✅ FIX: Set isConnected to true

//       console.log('✅ Wallet connected successfully:', {
//         address: accounts[0],
//         network: getNetworkName(Number(network.chainId)),
//         balance: formatEther(accountBalance)
//       });

//       return true;
//     } catch (err) {
//       console.error('❌ Failed to connect wallet:', err);
//       setError(err.message || 'Failed to connect to MetaMask');
//       setIsConnected(false); // ✅ FIX: Ensure isConnected is false on error
//       throw err;
//     } finally {
//       setIsConnecting(false);
//       setAuthenticationStep('idle');
//     }
//   };

//   const connectAndAuthenticate = async () => {
//     try {
//       setIsConnecting(true);

//       let walletAddress = account;
//       if (!walletAddress || !isConnected) {
//         console.log('🔌 Connecting wallet first...');
//         await connectWallet();
//         walletAddress = account || (await window.ethereum.request({ method: 'eth_accounts' }))[0];
//       }
//       if (!walletAddress) throw new Error('No wallet address available');

//       setAuthenticationStep('authenticating');
//       console.log('🔐 Starting authentication for:', walletAddress);

//       // Get SIWE message
//       const messageResponse = await authAPI.getWalletNonce(walletAddress);
//       if (!messageResponse.success || !messageResponse.message) {
//         throw new Error(messageResponse.error || 'Failed to get message from server');
//       }
      
//       console.log('📝 Got message from server, requesting signature...');
      
//       // Sign message
//       const signature = await signMessage(messageResponse.message);
//       console.log('✍️ Message signed, verifying with server...');

//       // Verify with server
//       const authResponse = await authAPI.verifyWalletSignature({
//         address: walletAddress,
//         signature,
//         message: messageResponse.message,
//       });
//       if (!authResponse.success || !authResponse.token) {
//         throw new Error(authResponse.error || 'Authentication failed');
//       }

//       // Normalize before storing
//       const normalized = normalizeUser(authResponse.user);

//       setIsAuthenticated(true);
//       setUser(normalized);
//       setToken(authResponse.token);

//       localStorage.setItem('authToken', authResponse.token);
//       localStorage.setItem('userData', JSON.stringify(normalized));

//       console.log('🎉 Web3 authentication successful:', {
//         user: normalized?.email || normalized?.username,
//         role: normalized?.role,
//         address: walletAddress
//       });

//       return { success: true, user: normalized, token: authResponse.token };
//     } catch (err) {
//       console.error('❌ Web3 authentication failed:', err);
//       setError(err.message || 'Authentication failed');
//       setIsAuthenticated(false);
//       setUser(null);
//       setToken(null);
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userData');
//       throw err;
//     } finally {
//       setIsConnecting(false);
//       setAuthenticationStep('idle');
//     }
//   };

//   const disconnect = async () => {
//     console.log('🔌 Disconnecting wallet...');
//     setAccount(null);
//     setProvider(null);
//     setSigner(null);
//     setChainId(null);
//     setBalance(null);
//     setIsConnected(false); // ✅ FIX: Set isConnected to false on disconnect

//     setIsAuthenticated(false);
//     setUser(null);
//     setToken(null);
//     setAuthenticationStep('idle');

//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//   };

//   const updateBalance = async () => {
//     if (provider && account) {
//       try {
//         const newBalance = await provider.getBalance(account);
//         setBalance(newBalance);
//       } catch (err) {
//         console.error('Failed to update balance:', err);
//       }
//     }
//   };

//   const validateStoredAuth = async () => {
//     const storedToken = localStorage.getItem('authToken');
//     const storedUserData = localStorage.getItem('userData');

//     if (storedToken && storedUserData) {
//       try {
//         const verifyResponse = await authAPI.verifyToken();
//         if (verifyResponse.success) {
//           const normalized = normalizeUser(JSON.parse(storedUserData));
//           setToken(storedToken);
//           setUser(normalized);
//           setIsAuthenticated(true);
//           console.log('✅ Restored authentication from stored token');
//         } else {
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('userData');
//         }
//       } catch (err) {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userData');
//       }
//     }
//   };

//   useEffect(() => {
//     if (!window.ethereum) return;

//     const handleAccountsChanged = (accounts) => {
//       console.log('🔄 Accounts changed:', accounts);
//       if (accounts.length === 0) {
//         disconnect();
//       } else if (accounts[0] !== account) {
//         setAccount(accounts[0]);
//         setIsConnected(accounts.length > 0); // ✅ FIX: Update isConnected based on accounts
//         // Clear auth on account change for security
//         if (isAuthenticated) {
//           console.log('👤 Account changed, clearing authentication');
//           setIsAuthenticated(false);
//           setUser(null);
//           setToken(null);
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('userData');
//         }
//       }
//     };

//     const handleChainChanged = (hexChainId) => {
//       const newChainId = parseInt(hexChainId, 16);
//       console.log('🌐 Chain changed to:', getNetworkName(newChainId));
//       setChainId(newChainId);
//     };

//     window.ethereum.on('accountsChanged', handleAccountsChanged);
//     window.ethereum.on('chainChanged', handleChainChanged);

//     return () => {
//       if (window.ethereum.removeListener) {
//         window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//         window.ethereum.removeListener('chainChanged', handleChainChanged);
//       }
//     };
//   }, [account, isAuthenticated]);

//   // ✅ FIX: Check existing connection and set isConnected properly
//   useEffect(() => {
//     const initializeWeb3 = async () => {
//       // First, validate any stored authentication
//       await validateStoredAuth();

//       // Then check if wallet is already connected
//       if (isMetaMaskInstalled()) {
//         try {
//           const accounts = await window.ethereum.request({
//             method: 'eth_accounts',
//           });

//           if (accounts.length > 0) {
//             const web3Provider = new BrowserProvider(window.ethereum);
//             const web3Signer = await web3Provider.getSigner();
//             const network = await web3Provider.getNetwork();
//             const accountBalance = await web3Provider.getBalance(accounts[0]);

//             setAccount(accounts[0]);
//             setProvider(web3Provider);
//             setSigner(web3Signer);
//             setChainId(Number(network.chainId));
//             setBalance(accountBalance);
//             setIsConnected(true); // ✅ FIX: Set isConnected to true when restoring connection

//             console.log('🔄 Restored existing wallet connection:', {
//               address: accounts[0],
//               network: getNetworkName(Number(network.chainId)),
//               balance: formatEther(accountBalance)
//             });
//           } else {
//             setIsConnected(false); // ✅ FIX: Explicitly set to false when no accounts
//           }
//         } catch (err) {
//           console.error('❌ Failed to check existing connection:', err);
//           setIsConnected(false); // ✅ FIX: Set to false on error
//         }
//       }
//     };

//     initializeWeb3();
//   }, []);

//   const value = {
//     // State
//     account,
//     provider,
//     signer,
//     chainId,
//     balance,
//     isConnecting,
//     error,
//     authenticationStep,
    
//     // Authentication state
//     isAuthenticated,
//     user,
//     token,

//     // ✅ FIX: Export isConnected properly
//     isConnected,

//     // Actions
//     connectWallet,
//     connectAndAuthenticate,
//     disconnect,
//     updateBalance,
//     clearError,

//     // Utilities
//     isMetaMaskInstalled,
//     getNetworkName,
//     getFormattedBalance,
//     signMessage,
//   };

//   return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
// };


// src/contexts/Web3Context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { authAPI } from '../services/api';

const Web3Context = createContext();

export const useWeb3 = () => {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error('useWeb3 must be used within a Web3Provider');
  return ctx;
};

// Back-compat alias
export const useWalletAuth = useWeb3;

const normalizeUser = (rawUser) => {
  if (!rawUser) return null;
  return {
    id: rawUser.id || rawUser.user_id,
    email: rawUser.email || (rawUser.wallet_address ? `${rawUser.wallet_address}@wallet.local` : null),
    first_name: rawUser.first_name,
    last_name: rawUser.last_name,
    username:
      rawUser.username ||
      (rawUser.wallet_address ? `wallet_${rawUser.wallet_address.slice(2, 10)}` : null),
    role: rawUser.role || 'user',
    wallet_address: rawUser.wallet_address || null,
  };
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authenticationStep, setAuthenticationStep] = useState('idle');

  const [isConnected, setIsConnected] = useState(false);
  const loading = isConnecting || authenticationStep !== 'idle';

  const clearError = () => setError(null);
  const isMetaMaskInstalled = () => typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  const getNetworkName = (chainIdParam = chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      5: 'Goerli',
      11155111: 'Sepolia',
      137: 'Polygon',
      80001: 'Polygon Mumbai',
      56: 'BSC',
      97: 'BSC Testnet',
      1337: 'Localhost',
      31337: 'Hardhat',
    };
    return networks[chainIdParam] || `Chain ID: ${chainIdParam}`;
  };

  const getFormattedBalance = () => {
    if (!balance) return '0.0000';
    return parseFloat(formatEther(balance)).toFixed(4);
  };

  const signMessage = async (message) => {
    if (!signer) throw new Error('No signer available');
    try {
      setAuthenticationStep('signing');
      return await signer.signMessage(message);
    } finally {
      setAuthenticationStep('idle');
    }
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) throw new Error('MetaMask is not installed. Please install it.');

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) throw new Error('No accounts found');

      const web3Provider = new BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();
      const accountBalance = await web3Provider.getBalance(accounts[0]);

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(Number(network.chainId));
      setBalance(accountBalance);
      setIsConnected(true);

      return true;
    } catch (err) {
      setError(err.message || 'Failed to connect to wallet');
      setIsConnected(false);
      throw err;
    } finally {
      setIsConnecting(false);
      setAuthenticationStep('idle');
    }
  };

  const connectAndAuthenticate = async () => {
    try {
      setIsConnecting(true);

      // Ensure wallet is connected
      let walletAddress = account;
      if (!walletAddress || !isConnected) {
        await connectWallet();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        walletAddress = accounts?.[0];
      }
      if (!walletAddress) throw new Error('No wallet address available');

      setAuthenticationStep('authenticating');

      // Get message/nonce from server
      const messageResponse = await authAPI.getWalletNonce(walletAddress);
      const message = messageResponse?.message
        ? messageResponse.message
        : `Please sign to authenticate.\n\nNonce: ${messageResponse?.nonce}\nAddress: ${walletAddress}`;
      if (!message) throw new Error('Failed to get message from server');

      // Sign message
      const signature = await signMessage(message);

      // Verify with server
      const authResponse = await authAPI.verifyWalletSignature({
        address: walletAddress,
        signature,
        message,
      });
      if (!authResponse?.token) {
        throw new Error(authResponse?.error || 'Authentication failed');
      }

      const normalized = normalizeUser(authResponse.user || authResponse);

      setIsAuthenticated(true);
      setUser(normalized);
      setToken(authResponse.token);

      // Unified keys
      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('user', JSON.stringify(normalized));
      localStorage.setItem('authMethod', 'web3');

      return { success: true, user: normalized, token: authResponse.token };
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authMethod');
      throw err;
    } finally {
      setIsConnecting(false);
      setAuthenticationStep('idle');
    }
  };

  const disconnect = async () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setBalance(null);
    setIsConnected(false);

    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setAuthenticationStep('idle');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authMethod');
  };

  const updateBalance = async () => {
    if (provider && account) {
      try {
        const newBalance = await provider.getBalance(account);
        setBalance(newBalance);
      } catch (err) {
        console.error('Failed to update balance:', err);
      }
    }
  };

  const validateStoredAuth = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');
    const storedAuthMethod = localStorage.getItem('authMethod');

    if (storedAuthMethod !== 'web3') return; // only restore wallet sessions here

    if (storedToken && storedUserData) {
      try {
        // If this call does NOT throw, token is valid enough to restore session
        await authAPI.verifyToken(storedToken);

        const normalized = normalizeUser(JSON.parse(storedUserData));
        setToken(storedToken);
        setUser(normalized);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authMethod');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      // Still try to restore token-based session without wallet connected
      validateStoredAuth();
      return;
    }

    const handleAccountsChanged = (accounts) => {
      // If MetaMask disconnects the site, keep the token session but mark wallet disconnected
      if (accounts.length === 0) {
        setIsConnected(false);
        setAccount(null);
        // DO NOT clear token/session here — keep authenticated if token valid
        return;
      }

      // If account changes, require re-auth for security
      const next = accounts[0];
      if (next !== account) {
        setAccount(next);
        setIsConnected(true);
        if (isAuthenticated) {
          // Clear auth and require re-auth with the new account
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('authMethod');
        }
      }
    };

    const handleChainChanged = (hexChainId) => {
      const newChainId = parseInt(hexChainId, 16);
      setChainId(newChainId);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Initial restore
    (async () => {
      await validateStoredAuth();

      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const web3Provider = new BrowserProvider(window.ethereum);
          const web3Signer = await web3Provider.getSigner();
          const network = await web3Provider.getNetwork();
          const accountBalance = await web3Provider.getBalance(accounts[0]);

          setAccount(accounts[0]);
          setProvider(web3Provider);
          setSigner(web3Signer);
          setChainId(Number(network.chainId));
          setBalance(accountBalance);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (err) {
        console.error('Failed to restore wallet connection:', err);
        setIsConnected(false);
      }
    })();

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isAuthenticated]);

  const value = {
    // wallet state
    account,
    provider,
    signer,
    chainId,
    balance,
    isConnecting,
    isConnected,
    loading,
    error,
    authenticationStep,

    // auth state
    isAuthenticated,
    user,
    token,

    // actions
    connectWallet,
    connectAndAuthenticate,
    disconnect,
    updateBalance,
    clearError,

    // utils
    isMetaMaskInstalled,
    getNetworkName,
    getFormattedBalance,
    signMessage,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};