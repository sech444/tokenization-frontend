// src/components/marketplace/TradingInterface.js

import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../hooks/useMarketplace';
import { useTokens } from '../../hooks/useTokens';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../common/Modal';

const TradingInterface = ({ 
  listing = null, 
  onClose = null, 
  onTrade = null, 
  formatPrice = null, 
  isModal = false 
}) => {
  const [formData, setFormData] = useState({
    token_id: '',
    quantity: '',
    price_per_token: '',
    listing_type: 'sell',
    expires_in_days: '7'
  });
  const [userBalances, setUserBalances] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [tradeQuantity, setTradeQuantity] = useState(1);

  const { createListing, loading, error, clearError } = useMarketplace();
  const { tokens, getUserTokenBalance } = useTokens();
  const { user } = useAuth();

  // Load user token balances
  useEffect(() => {
    const loadBalances = async () => {
      if (user && tokens.length > 0) {
        const balances = {};
        for (const token of tokens) {
          try {
            const balance = await getUserTokenBalance(token.id);
            balances[token.id] = balance;
          } catch (error) {
            console.error(`Error loading balance for token ${token.id}:`, error);
            balances[token.id] = 0;
          }
        }
        setUserBalances(balances);
      }
    };
    loadBalances();
  }, [user, tokens, getUserTokenBalance]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    clearError();
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const listingData = {
        token_id: formData.token_id,
        quantity: parseInt(formData.quantity),
        price_per_token: parseFloat(formData.price_per_token),
        listing_type: formData.listing_type
      };

      await createListing(listingData);
      
      // Reset form
      setFormData({
        token_id: '',
        quantity: '',
        price_per_token: '',
        listing_type: 'sell',
        expires_in_days: '7'
      });
      
      alert('Listing created successfully!');
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrade = () => {
    if (listing && onTrade) {
      onTrade(listing.id, tradeQuantity);
    }
  };

  const selectedToken = tokens.find(t => t.id === formData.token_id);
  const selectedTokenBalance = userBalances[formData.token_id] || 0;
  const totalValue = formData.quantity && formData.price_per_token 
    ? parseFloat(formData.quantity) * parseFloat(formData.price_per_token)
    : 0;

  const canCreateListing = () => {
    if (!formData.token_id || !formData.quantity || !formData.price_per_token) {
      return false;
    }
    
    if (formData.listing_type === 'sell' && parseInt(formData.quantity) > selectedTokenBalance) {
      return false;
    }
    
    return true;
  };

  // Format price helper if not provided
  const defaultFormatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const priceFormatter = formatPrice || defaultFormatPrice;

  // If this is a modal for viewing/trading a specific listing
  if (isModal && listing) {
    const modalContent = (
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {listing.listing_type === 'sell' ? 'Buy Tokens' : 'Sell Tokens'}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">{listing.token_name}</h3>
          <p className="text-sm text-gray-600">{listing.token_symbol}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Price per token:</span>
            <span className="font-medium">{priceFormatter(listing.price_per_token)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Available:</span>
            <span className="font-medium">{listing.quantity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Seller:</span>
            <span className="font-medium">{listing.seller_username}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity to {listing.listing_type === 'sell' ? 'buy' : 'sell'}
          </label>
          <input
            type="number"
            min="1"
            max={listing.quantity}
            value={tradeQuantity}
            onChange={(e) => setTradeQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 text-sm text-gray-600">
            Total: {priceFormatter(listing.price_per_token * tradeQuantity)}
          </div>
        </div>

        <div className="flex gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleTrade}
            disabled={tradeQuantity <= 0 || tradeQuantity > listing.quantity}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Confirm {listing.listing_type === 'sell' ? 'Purchase' : 'Sale'}
          </button>
        </div>
      </div>
    );

    return onClose ? <Modal onClose={onClose}>{modalContent}</Modal> : modalContent;
  }

  // Regular create listing interface
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Listing</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateListing} className="space-y-6">
        {/* Listing Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Listing Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="listing_type"
                value="sell"
                checked={formData.listing_type === 'sell'}
                onChange={(e) => handleInputChange('listing_type', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Sell Order (I want to sell tokens)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="listing_type"
                value="buy"
                checked={formData.listing_type === 'buy'}
                onChange={(e) => handleInputChange('listing_type', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Buy Order (I want to buy tokens)</span>
            </label>
          </div>
        </div>

        {/* Token Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Token
          </label>
          <select
            value={formData.token_id}
            onChange={(e) => handleInputChange('token_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a token</option>
            {tokens.map(token => (
              <option key={token.id} value={token.id}>
                {token.name} ({token.symbol})
                {formData.listing_type === 'sell' && userBalances[token.id] !== undefined && 
                  ` - Balance: ${userBalances[token.id].toLocaleString()}`
                }
              </option>
            ))}
          </select>
          {selectedToken && formData.listing_type === 'sell' && (
            <div className="mt-1 text-sm text-gray-600">
              Available balance: {selectedTokenBalance.toLocaleString()} {selectedToken.symbol}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max={formData.listing_type === 'sell' ? selectedTokenBalance : undefined}
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {formData.listing_type === 'sell' && parseInt(formData.quantity) > selectedTokenBalance && (
            <div className="mt-1 text-sm text-red-600">
              Insufficient balance. Available: {selectedTokenBalance}
            </div>
          )}
        </div>

        {/* Price per Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price per Token (USD)
          </label>
          <input
            type="number"
            step="0.000001"
            min="0.000001"
            value={formData.price_per_token}
            onChange={(e) => handleInputChange('price_per_token', e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Total Value Display */}
        {totalValue > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total Value:</span>
              <span className="text-xl font-bold text-green-600">
                {priceFormatter(totalValue)}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!canCreateListing() || submitting || loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting || loading ? 'Creating Listing...' : 'Create Listing'}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Sell Order:</strong> You offer to sell your tokens at a specific price</li>
          <li>• <strong>Buy Order:</strong> You offer to buy tokens at a specific price</li>
          <li>• Other users can accept your listing and complete the trade</li>
          <li>• Trades are executed automatically when matched</li>
        </ul>
      </div>
    </div>
  );
};

export default TradingInterface;