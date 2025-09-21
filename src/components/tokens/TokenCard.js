// src/components/tokens/TokenCard.js
import React from 'react';
import { Eye, ShoppingCart, TrendingUp, TrendingDown, Users, Calendar } from 'lucide-react';

const TokenCard = ({ token, onViewDetails, onPurchase }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {token.symbol?.charAt(0) || 'T'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{token.name}</h3>
              <p className="text-sm text-gray-500">{token.symbol}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              token.project_type === 'Technology' ? 'bg-blue-100 text-blue-800' :
              token.project_type === 'Energy' ? 'bg-green-100 text-green-800' :
              token.project_type === 'Real Estate' ? 'bg-purple-100 text-purple-800' :
              token.project_type === 'Healthcare' ? 'bg-red-100 text-red-800' :
              token.project_type === 'Finance' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {token.project_type}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {token.description}
        </p>

        {/* Price Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(token.price_per_token)}
            </span>
            <div className={`flex items-center space-x-1 ${getPriceChangeColor(token.price_change_24h)}`}>
              {getPriceChangeIcon(token.price_change_24h)}
              <span className="text-sm font-medium">
                {token.price_change_24h > 0 ? '+' : ''}{token.price_change_24h?.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{formatNumber(token.investors_count || 0)} investors</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(token.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Market Cap</span>
              <div className="font-semibold text-gray-900">
                {formatCurrency(token.market_cap || 0)}
              </div>
            </div>
            <div>
              <span className="text-gray-500">24h Volume</span>
              <div className="font-semibold text-gray-900">
                {formatCurrency(token.volume_24h || 0)}
              </div>
            </div>
          </div>

          {/* Progress Bar for Token Sale */}
          {token.total_supply && token.available_tokens && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Token Sale Progress</span>
                <span>{((token.total_supply - token.available_tokens) / token.total_supply * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ 
                    width: `${((token.total_supply - token.available_tokens) / token.total_supply * 100)}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatNumber(token.total_supply - token.available_tokens)} sold</span>
                <span>{formatNumber(token.available_tokens)} remaining</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(token)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button
            onClick={() => onPurchase(token)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;