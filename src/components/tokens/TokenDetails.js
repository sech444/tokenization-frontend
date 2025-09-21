// tokenization-frontend/src/components/tokens/TokenDetails.js

import React from 'react';
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  ShoppingCart, 
  ExternalLink 
} from 'lucide-react'; 
import { useAuth } from '../../hooks/useAuth';

const TokenDetailsModal = ({ token, onClose, onPurchase }) => {
  const { user, users } = useAuth();
  const formatPrice = (price) => `$${price.toFixed(2)}`;
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-2xl">
            <img 
              src={token.image_url} 
              alt={token.name}
              className="w-full h-full object-cover rounded-t-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            ×
          </button>
          {token.is_verified && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verified Project
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Token Info Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{token.name}</h1>
                <span className="text-lg text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{token.symbol}</span>
              </div>
              <p className="text-gray-600 text-lg mb-4">{token.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Created by {token.creator}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(token.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {token.project_type}
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="text-4xl font-bold text-gray-900 mb-2">{formatPrice(token.price_per_token)}</div>
              <div className={`text-lg flex items-center gap-2 ${token.price_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {token.price_change_24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {Math.abs(token.price_change_24h).toFixed(1)}% (24h)
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">${formatNumber(token.market_cap)}</div>
              <div className="text-blue-700 text-sm">Market Cap</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">${formatNumber(token.volume_24h)}</div>
              <div className="text-green-700 text-sm">24h Volume</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{token.investors_count || 0}</div>
              <div className="text-purple-700 text-sm">Investors</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{token.roi_percentage || 0}%</div>
              <div className="text-orange-700 text-sm">Expected ROI</div>
            </div>
          </div>

          {/* Supply Information */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Supply</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Supply</div>
                <div className="text-xl font-bold text-gray-900">{formatNumber(token.total_supply)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Available</div>
                <div className="text-xl font-bold text-green-600">{formatNumber(token.available_supply)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Sold</div>
                <div className="text-xl font-bold text-blue-600">{formatNumber(token.total_supply - token.available_supply)}</div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Sale Progress</span>
                <span>{((token.total_supply - token.available_supply) / token.total_supply * 100).toFixed(1)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((token.total_supply - token.available_supply) / token.total_supply * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onPurchase}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Purchase Tokens
            </button>
            <button className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-5 h-5" />
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailsModal;