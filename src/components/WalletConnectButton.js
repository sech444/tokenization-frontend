// src/components/WalletConnectButton.js

import React, { useState } from 'react';
import { useWalletAuth } from '../contexts/Web3Context';
import WalletErrorHandler from './WalletErrorHandler';

const WalletConnectButton = ({ 
  onSuccess, 
  className = '',
  variant = 'primary' // 'primary', 'secondary', 'link'
}) => {
  const { 
    connectAndAuthenticate, 
    connectWallet,
    isConnecting, 
    isAuthenticated,
    account,
    error,
    clearError,
    isMetaMaskInstalled
  } = useWalletAuth();

  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const handleConnect = async () => {
    // Clear any existing errors first
    clearError();

    // Check if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      setShowInstallPrompt(true);
      return;
    }

    try {
      const success = await connectAndAuthenticate();
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error is already handled in the context
      console.error('Connection failed:', err);
    }
  };

  const handleConnectOnly = async () => {
    clearError();
    
    if (!isMetaMaskInstalled()) {
      setShowInstallPrompt(true);
      return;
    }

    try {
      const success = await connectWallet();
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isAuthenticated) return `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}`;
    return 'Connect Wallet';
  };

  const getButtonClass = () => {
    const baseClass = 'wallet-connect-btn';
    const variantClass = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      link: 'btn-link'
    }[variant];
    
    return `${baseClass} ${variantClass} ${className}`;
  };

  if (showInstallPrompt) {
    return (
      <div className="install-prompt">
        <div className="install-card">
          <h3>MetaMask Required</h3>
          <p>Please install MetaMask to connect your wallet:</p>
          <div className="install-actions">
            <a 
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="install-button"
            >
              Install MetaMask
            </a>
            <button 
              onClick={() => setShowInstallPrompt(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>

        <style jsx>{`
          .install-prompt {
            margin: 16px 0;
          }

          .install-card {
            padding: 20px;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            text-align: center;
          }

          .install-card h3 {
            margin: 0 0 12px 0;
            color: #1f2937;
          }

          .install-card p {
            margin: 0 0 16px 0;
            color: #6b7280;
          }

          .install-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .install-button {
            background-color: #f97316;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .install-button:hover {
            background-color: #ea580c;
          }

          .cancel-button {
            background-color: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
          }

          .cancel-button:hover {
            background-color: #f3f4f6;
            color: #374151;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wallet-connect-container">
      <button
        onClick={handleConnect}
        disabled={isConnecting || isAuthenticated}
        className={getButtonClass()}
      >
        {getButtonText()}
      </button>

      {/* Show option for connect-only if not authenticated */}
      {!isAuthenticated && !isConnecting && (
        <button
          onClick={handleConnectOnly}
          className="connect-only-btn"
        >
          Connect Only (No Auth)
        </button>
      )}

      {/* Error handling */}
      <WalletErrorHandler />

      <style jsx>{`
        .wallet-connect-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wallet-connect-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
        }

        .wallet-connect-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .btn-secondary {
          background-color: #6b7280;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #4b5563;
        }

        .btn-link {
          background-color: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
        }

        .btn-link:hover:not(:disabled) {
          background-color: #3b82f6;
          color: white;
        }

        .connect-only-btn {
          padding: 8px 16px;
          background-color: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .connect-only-btn:hover {
          background-color: #f3f4f6;
          color: #374151;
        }

        @media (max-width: 640px) {
          .wallet-connect-btn {
            width: 100%;
          }
          
          .connect-only-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default WalletConnectButton;