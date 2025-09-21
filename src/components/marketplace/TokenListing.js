// src/components/marketplace/TokenListing.js

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const TokenListing = ({ listing, onSelect, onBuy, formatPrice, formatDate }) => {
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const { user } = useAuth();

  const isOwnListing = user && listing.seller_id === user.id;
  const isExpired = listing.expires_at && new Date(listing.expires_at) < new Date();
  const isActive = listing.status === 'active' && !isExpired;

  const handleBuyClick = () => {
    if (buyQuantity > 0 && buyQuantity <= listing.quantity) {
      onBuy(listing.id, parseInt(buyQuantity));
      setShowBuyForm(false);
      setBuyQuantity(1);
    }
  };

  const getStatusBadge = () => {
    if (isExpired) {
      return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">Expired</span>;
    }
    
    switch (listing.status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{listing.status}</span>;
    }
  };

  const getListingTypeColor = () => {
    return listing.listing_type === 'sell' 
      ? 'bg-red-50 border-red-200 text-red-800' 
      : 'bg-green-50 border-green-200 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {listing.token_name || 'Unnamed Token'}
            </h3>
            <p className="text-sm text-gray-600">
              {listing.token_symbol || 'N/A'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge()}
            <div className={`px-2 py-1 text-xs border rounded-full font-medium ${getListingTypeColor()}`}>
              {listing.listing_type.toUpperCase()} ORDER
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Quantity */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Price per token</span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(listing.price_per_token)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Available quantity</span>
            <span className="font-medium text-gray-900">
              {listing.quantity.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total value</span>
            <span className="font-medium text-green-600">
              {formatPrice(listing.total_value)}
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {listing.seller_username ? listing.seller_username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {listing.seller_username || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500">
                Listed {formatDate(listing.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Expiration */}
        {listing.expires_at && (
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expires</span>
              <span className={`text-sm font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                {formatDate(listing.expires_at)}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {listing.listing_type === 'sell' && !isOwnListing && isActive ? (
            <div>
              {!showBuyForm ? (
                <button
                  onClick={() => setShowBuyForm(true)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Buy Tokens
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max={listing.quantity}
                      value={buyQuantity}
                      onChange={(e) => setBuyQuantity(parseInt(e.target.value) || 0)}
                      placeholder="Quantity"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex flex-col text-xs text-gray-600">
                      <span>Total:</span>
                      <span className="font-medium text-green-600">
                        {formatPrice(listing.price_per_token * buyQuantity)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowBuyForm(false);
                        setBuyQuantity(1);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBuyClick}
                      disabled={buyQuantity <= 0 || buyQuantity > listing.quantity}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : listing.listing_type === 'buy' && !isOwnListing && isActive ? (
            <button
              onClick={() => onSelect(listing)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sell to This Buyer
            </button>
          ) : isOwnListing ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">Your Listing</p>
              <p className="text-xs text-blue-600">
                {listing.listing_type === 'sell' ? 'Waiting for buyers' : 'Waiting for sellers'}
              </p>
            </div>
          ) : !isActive ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-600 font-medium">
                {isExpired ? 'Expired' : 'Not Available'}
              </p>
            </div>
          ) : (
            <button
              onClick={() => onSelect(listing)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenListing;