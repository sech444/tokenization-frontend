// src/components/WalletErrorHandler.js

import React from 'react';
import { useWalletAuth } from '../contexts/Web3Context';

const WalletErrorHandler = ({ className = '' }) => {
  const { error, clearError, retryConnection, isConnecting } = useWalletAuth();

  if (!error) return null;

  const isConnectionError = error.includes('rejected') || error.includes('unlock') || error.includes('MetaMask');

  return (
    <div className={`wallet-error-container ${className}`}>
      <div className="error-card">
        <div className="error-icon">
          ⚠️
        </div>
        <div className="error-content">
          <h3 className="error-title">
            {isConnectionError ? 'Connection Issue' : 'Error'}
          </h3>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            {isConnectionError && (
              <button 
                onClick={retryConnection}
                disabled={isConnecting}
                className="retry-button"
              >
                {isConnecting ? 'Connecting...' : 'Try Again'}
              </button>
            )}
            <button 
              onClick={clearError}
              className="dismiss-button"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wallet-error-container {
          margin: 16px 0;
        }

        .error-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #991b1b;
        }

        .error-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .error-content {
          flex: 1;
        }

        .error-title {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .error-message {
          margin: 0 0 12px 0;
          font-size: 14px;
          line-height: 1.4;
        }

        .error-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .retry-button {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .retry-button:hover:not(:disabled) {
          background-color: #b91c1c;
        }

        .retry-button:disabled {
          background-color: #fca5a5;
          cursor: not-allowed;
        }

        .dismiss-button {
          background-color: transparent;
          color: #991b1b;
          border: 1px solid #dc2626;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dismiss-button:hover {
          background-color: #dc2626;
          color: white;
        }

        @media (max-width: 640px) {
          .error-actions {
            flex-direction: column;
          }
          
          .retry-button,
          .dismiss-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default WalletErrorHandler;