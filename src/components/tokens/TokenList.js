// src/components/tokens/TokenList.js
import React, { useState } from 'react';
import { Search, Filter, BarChart3, AlertCircle } from 'lucide-react'; // Add this import
import { useTokens } from '../../hooks/useTokens';
import TokenCard from './TokenCard';
import TokenDetailsModal from './TokenDetails';
import PurchaseModal from './PurchaseModal';

const TokenList = () => {
  const { tokens, loading, error } = useTokens();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedToken, setSelectedToken] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const categories = ['all', 'Technology', 'Energy', 'Real Estate', 'Healthcare', 'Finance'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'market-cap', label: 'Market Cap' },
    { value: 'volume', label: '24h Volume' }
  ];

  const filteredTokens = tokens
    .filter(token => {
      const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          token.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || token.project_type === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'price-low':
          return a.price_per_token - b.price_per_token;
        case 'price-high':
          return b.price_per_token - a.price_per_token;
        case 'market-cap':
          return (b.market_cap || 0) - (a.market_cap || 0);
        case 'volume':
          return (b.volume_24h || 0) - (a.volume_24h || 0);
        case 'newest':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  const handleViewDetails = (token) => {
    setSelectedToken(token);
  };

  const handlePurchase = (token) => {
    setSelectedToken(token);
    setShowPurchaseModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Tokens</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Token Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover and invest in tokenized projects</p>
        </div>
        
        {/* Stats Overview */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{tokens.length}</div>
            <div className="text-xs text-gray-500">Total Tokens</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ${tokens.reduce((sum, t) => sum + (t.volume_24h || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">24h Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {tokens.reduce((sum, t) => sum + (t.investors_count || 0), 0)}
            </div>
            <div className="text-xs text-gray-500">Active Investors</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative bg-gray-50 rounded-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1 text-purple-600 hover:text-purple-800">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Showing {filteredTokens.length} of {tokens.length} tokens
        </div>
      </div>

      {/* Token Grid */}
      {filteredTokens.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tokens found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.map(token => (
            <TokenCard
              key={token.id}
              token={token}
              onViewDetails={handleViewDetails}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}

      {/* Token Details Modal */}
      {selectedToken && !showPurchaseModal && (
        <TokenDetailsModal 
          token={selectedToken} 
          onClose={() => setSelectedToken(null)}
          onPurchase={() => setShowPurchaseModal(true)}
        />
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedToken && (
        <PurchaseModal
          token={selectedToken}
          amount={purchaseAmount}
          onAmountChange={setPurchaseAmount}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedToken(null);
            setPurchaseAmount(1);
          }}
        />
      )}
    </div>
  );
};

export default TokenList;