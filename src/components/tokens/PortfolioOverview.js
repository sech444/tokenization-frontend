// tokenization-frontend/src/components/tokens/PortfolioOverview.js

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Eye, Trash2, Wallet } from 'lucide-react';
import { useTokens } from '../../hooks/useTokens';

const PortfolioOverview = () => {
  // Mock user tokens data - replace with actual hook/API call
  const [userTokens, setUserTokens] = useState([
    {
      id: 1,
      name: 'Tech Startup Alpha',
      symbol: 'TSA',
      quantity: 150,
      purchase_price: 10.50,
      current_price: 11.05,
      total_value: 1657.50,
      profit_loss: 82.50,
      profit_loss_percentage: 5.24,
      purchase_date: '2024-02-15'
    },
    {
      id: 2,
      name: 'Green Energy Project', 
      symbol: 'GEP',
      quantity: 75,
      purchase_price: 25.00,
      current_price: 24.48,
      total_value: 1836.00,
      profit_loss: -39.00,
      profit_loss_percentage: -2.08,
      purchase_date: '2024-02-20'
    },
    {
      id: 3,
      name: 'Real Estate Fund',
      symbol: 'REF',
      quantity: 50,
      purchase_price: 45.00,
      current_price: 52.10,
      total_value: 2605.00,
      profit_loss: 355.00,
      profit_loss_percentage: 15.78,
      purchase_date: '2024-01-10'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showSellModal, setShowSellModal] = useState(false);

  // Calculate portfolio totals
  const totalPortfolioValue = userTokens.reduce((sum, token) => sum + token.total_value, 0);
  const totalProfitLoss = userTokens.reduce((sum, token) => sum + token.profit_loss, 0);
  const totalProfitLossPercentage = totalPortfolioValue > 0 
    ? (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100 
    : 0;

  const formatPrice = (price) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handleViewDetails = (token) => {
    setSelectedToken(token);
    // Implement token details modal
    console.log('View details for:', token.name);
  };

  const handleSellToken = (token) => {
    setSelectedToken(token);
    setShowSellModal(true);
    // Implement sell functionality
    console.log('Sell token:', token.name);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Total Portfolio Value</div>
            <div className="text-3xl font-bold">{formatPrice(totalPortfolioValue)}</div>
            <div className="text-blue-200 text-xs mt-1">
              {userTokens.length} token{userTokens.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">Total P&L</div>
            <div className={`text-3xl font-bold flex items-center gap-2 ${totalProfitLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {totalProfitLoss >= 0 ? <ArrowUpRight className="w-8 h-8" /> : <ArrowDownRight className="w-8 h-8" />}
              {formatPrice(Math.abs(totalProfitLoss))}
            </div>
            <div className="text-blue-200 text-xs mt-1">
              Since inception
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-blue-200 text-sm mb-1">P&L Percentage</div>
            <div className={`text-3xl font-bold flex items-center gap-2 ${totalProfitLossPercentage >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {totalProfitLossPercentage >= 0 ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
              {totalProfitLossPercentage >= 0 ? '+' : ''}{totalProfitLossPercentage.toFixed(2)}%
            </div>
            <div className="text-blue-200 text-xs mt-1">
              Overall return
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
        <div className="space-y-3">
          {userTokens.map(token => {
            const percentage = (token.total_value / totalPortfolioValue) * 100;
            return (
              <div key={token.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">{token.symbol}</span>
                  <span className="text-sm text-gray-500">{token.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Your Holdings</h3>
            <div className="text-sm text-gray-500">
              Total: {userTokens.length} position{userTokens.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        {userTokens.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Wallet className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Holdings Yet</h3>
            <p className="text-gray-600 mb-4">Start investing in tokenized projects to build your portfolio.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Explore Marketplace
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userTokens.map(token => (
                  <tr key={token.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {token.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{token.name}</div>
                          <div className="text-sm text-gray-500 font-mono">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {token.quantity.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">tokens</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(token.purchase_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(token.current_price)}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        token.current_price >= token.purchase_price ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {token.current_price >= token.purchase_price ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        {((token.current_price - token.purchase_price) / token.purchase_price * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {formatPrice(token.total_value)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold flex items-center gap-1 ${
                        token.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {token.profit_loss >= 0 ? 
                          <ArrowUpRight className="w-4 h-4" /> : 
                          <ArrowDownRight className="w-4 h-4" />
                        }
                        {formatPrice(Math.abs(token.profit_loss))}
                      </div>
                      <div className={`text-xs ${
                        token.profit_loss_percentage >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ({token.profit_loss_percentage >= 0 ? '+' : ''}{token.profit_loss_percentage.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(token.purchase_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(token)}
                          className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleSellToken(token)}
                          className="text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded text-xs font-medium"
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Best Performer</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          {userTokens.length > 0 && (
            <>
              {(() => {
                const bestPerformer = userTokens.reduce((best, current) => 
                  current.profit_loss_percentage > best.profit_loss_percentage ? current : best
                );
                return (
                  <div>
                    <div className="text-lg font-bold text-gray-900">{bestPerformer.symbol}</div>
                    <div className="text-2xl font-bold text-green-600">
                      +{bestPerformer.profit_loss_percentage.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatPrice(bestPerformer.profit_loss)} profit
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Largest Position</h3>
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
          {userTokens.length > 0 && (
            <>
              {(() => {
                const largestPosition = userTokens.reduce((largest, current) => 
                  current.total_value > largest.total_value ? current : largest
                );
                return (
                  <div>
                    <div className="text-lg font-bold text-gray-900">{largestPosition.symbol}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(largestPosition.total_value)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {((largestPosition.total_value / totalPortfolioValue) * 100).toFixed(1)}% of portfolio
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Recent Activity</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          {userTokens.length > 0 && (
            <>
              {(() => {
                const mostRecent = userTokens.reduce((recent, current) => 
                  new Date(current.purchase_date) > new Date(recent.purchase_date) ? current : recent
                );
                return (
                  <div>
                    <div className="text-lg font-bold text-gray-900">{mostRecent.symbol}</div>
                    <div className="text-sm text-gray-600">
                      Purchased {formatDate(mostRecent.purchase_date)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {mostRecent.quantity.toLocaleString()} tokens
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;