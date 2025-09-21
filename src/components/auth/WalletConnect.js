// tokenization-frontend/src/components/auth/WalletConnect.js

import React, { useState, useEffect } from 'react';
import { useWalletAuth } from '../../hooks/useWalletAuth';

const WalletConnect = ({ onSuccess, onError, className = '' }) => {
  const {
    account,
    isConnecting,
    isAuthenticated,
    user,
    error,
    connectAndAuthenticate,
    disconnect,
    isMetaMaskInstalled,
    getConnectionStatus,
    getUserDisplayName,
    getShortAddress,
    getNetworkName,
    isOnCorrectNetwork,
    switchNetwork,
    clearError,
  } = useWalletAuth();

  const [showDetails, setShowDetails] = useState(false);
  const connectionStatus = getConnectionStatus();

  // Handle successful authentication
  useEffect(() => {
    if (isAuthenticated && user && onSuccess) {
      onSuccess(user);
    }
  }, [isAuthenticated, user, onSuccess]);

  // Handle errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Handle wallet connection and authentication
  const handleConnect = async () => {
    clearError();
    const success = await connectAndAuthenticate();
    if (!success && error) {
      console.error('Connection failed:', error);
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    clearError();
    await disconnect();
  };

  // Handle network switch (example: switch to Polygon)
  const handleSwitchToPolygon = async () => {
    clearError();
    await switchNetwork(137); // Polygon mainnet
  };

  // Render different states
  const renderContent = () => {
    switch (connectionStatus) {
      case 'metamask_not_installed':
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status error">
              <h3>MetaMask Not Found</h3>
              <p>Please install MetaMask to connect your wallet.</p>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Install MetaMask
              </a>
            </div>
          </div>
        );

      case 'not_connected':
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status">
              <h3>Connect Your Wallet</h3>
              <p>Connect your wallet to access the tokenization platform.</p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="btn btn-primary"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        );

      case 'connected_not_authenticated':
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status">
              <h3>Authenticate Your Wallet</h3>
              <p>Connected: {getShortAddress()}</p>
              <p>Please sign the message to authenticate with our platform.</p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="btn btn-primary"
              >
                {isConnecting ? 'Authenticating...' : 'Sign Message'}
              </button>
            </div>
          </div>
        );

      case 'wrong_network':
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status warning">
              <h3>Wrong Network</h3>
              <p>You're connected to: {getNetworkName()}</p>
              <p>Please switch to a supported network.</p>
              <div className="network-buttons">
                <button
                  onClick={handleSwitchToPolygon}
                  className="btn btn-secondary"
                >
                  Switch to Polygon
                </button>
                <button
                  onClick={() => switchNetwork(1)}
                  className="btn btn-secondary"
                >
                  Switch to Ethereum
                </button>
              </div>
            </div>
          </div>
        );

      case 'fully_connected':
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status success">
              <div className="wallet-info">
                <div className="user-info">
                  <h3>Welcome, {getUserDisplayName()}!</h3>
                  <p className="wallet-address">
                    Wallet: {getShortAddress()}
                  </p>
                  <p className="network-info">
                    Network: {getNetworkName()}
                  </p>
                </div>
                
                <div className="wallet-actions">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="btn btn-outline"
                  >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="btn btn-secondary"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {showDetails && (
                <div className="wallet-details">
                  <div className="detail-item">
                    <label>User ID:</label>
                    <span>{user?.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{user?.email || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Role:</label>
                    <span>{user?.role || 'User'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Full Address:</label>
                    <span className="full-address">{account}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="wallet-connect-container">
            <div className="wallet-status">
              <p>Loading wallet status...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`wallet-connect ${className}`}>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={clearError} className="btn btn-sm">
            Dismiss
          </button>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default WalletConnect;


