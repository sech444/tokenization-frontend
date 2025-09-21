// src/components/marketplace/MarketplaceHome.js

import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../hooks/useMarketplace';
import { useTokens } from '../../hooks/useTokens';
import TokenListing from './TokenListing';
import TradingInterface from './TradingInterface';
import LoadingSpinner from '../common/LoadingSpinner';

const MarketplaceHome = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [filters, setFilters] = useState({
    listing_type: '',
    token_id: '',
    min_price: '',
    max_price: '',
    search: ''
  });
  const [selectedListing, setSelectedListing] = useState(null);
  
  const { 
    listings, 
    loading, 
    error, 
    pagination, 
    fetchListings, 
    buyTokens, 
    loadMoreListings,
    clearError 
  } = useMarketplace();
  
  const { tokens } = useTokens();

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesType = !filters.listing_type || listing.listing_type === filters.listing_type;
    const matchesToken = !filters.token_id || listing.token_id === filters.token_id;
    const matchesMinPrice = !filters.min_price || listing.price_per_token >= parseFloat(filters.min_price);
    const matchesMaxPrice = !filters.max_price || listing.price_per_token <= parseFloat(filters.max_price);
    const matchesSearch = !filters.search || 
      listing.token_name.toLowerCase().includes(filters.search.toLowerCase()) ||
      listing.token_symbol.toLowerCase().includes(filters.search.toLowerCase()) ||
      listing.seller_username.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesToken && matchesMinPrice && matchesMaxPrice && matchesSearch;
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBuyTokens = async (listingId, quantity) => {
    try {
      await buyTokens(listingId, quantity);
      setSelectedListing(null);
      alert('Tokens purchased successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !listings.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Token name, symbol, or seller..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Listing Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.listing_type}
                onChange={(e) => handleFilterChange('listing_type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="sell">Sell Orders</option>
                <option value="buy">Buy Orders</option>
              </select>
            </div>

            {/* Token Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.token_id}
                onChange={(e) => handleFilterChange('token_id', e.target.value)}
              >
                <option value="">All Tokens</option>
                {tokens.map(token => (
                  <option key={token.id} value={token.id}>
                    {token.name} ({token.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange('min_price', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange('max_price', e.target.value)}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                listing_type: '',
                token_id: '',
                min_price: '',
                max_price: '',
                search: ''
              })}
              className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
            <p className="text-gray-600">
              Trade tokenized assets with other users
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Browse Listings
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Listing
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <div className="flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={clearError}
                  className="text-red-700 hover:text-red-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'browse' ? (
            <div>
              {/* Listings Count */}
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredListings.length} of {pagination.total} listings
              </div>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {filteredListings.map(listing => (
                  <TokenListing
                    key={listing.id}
                    listing={listing}
                    onSelect={setSelectedListing}
                    onBuy={handleBuyTokens}
                    formatPrice={formatPrice}
                    formatDate={formatDate}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {pagination.page < pagination.total_pages && (
                <div className="text-center">
                  <button
                    onClick={() => loadMoreListings(filters)}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}

              {/* No Results */}
              {!loading && filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No listings found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or check back later.
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create First Listing
                  </button>
                </div>
              )}
            </div>
          ) : (
            <TradingInterface />
          )}
        </div>
      </div>

      {/* Trading Modal */}
      {selectedListing && (
        <TradingInterface
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onTrade={handleBuyTokens}
          formatPrice={formatPrice}
          isModal={true}
        />
      )}
    </div>
  );
};

export default MarketplaceHome;