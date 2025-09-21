// src/hooks/useTokens.js

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

// You'll need to create this API service or adjust the import path
// import { tokenAPI, marketplaceAPI } from '../services/api';

// Mock API functions - replace with your actual API calls
const mockTokenAPI = {
  getAllTokens: () => Promise.resolve([
    {
      id: 1,
      name: 'Tech Startup Alpha',
      symbol: 'TSA',
      total_supply: 1000000,
      available_supply: 750000,
      price_per_token: 10.50,
      project_type: 'Technology',
      description: 'Revolutionary AI startup disrupting the fintech space',
      image_url: '/api/placeholder/400/300',
      creator: 'John Doe',
      created_at: '2024-01-15',
      is_verified: true,
      market_cap: 10500000,
      volume_24h: 125000,
      price_change_24h: 5.2
    },
    {
      id: 2,
      name: 'Green Energy Project',
      symbol: 'GEP',
      total_supply: 500000,
      available_supply: 300000,
      price_per_token: 25.00,
      project_type: 'Energy',
      description: 'Sustainable solar farm investment opportunity',
      image_url: '/api/placeholder/400/300',
      creator: 'Jane Smith',
      created_at: '2024-01-20',
      is_verified: true,
      market_cap: 12500000,
      volume_24h: 89000,
      price_change_24h: -2.1
    }
  ]),
  
  getTokenById: (id) => Promise.resolve({
    id: id,
    name: 'Sample Token',
    symbol: 'ST',
    description: 'Sample token description',
    // ... other properties
  }),
  
  getUserTokens: (userId) => Promise.resolve([]),
  
  getMarketplaceTokens: () => Promise.resolve([]),
  
  searchTokens: (query) => Promise.resolve([]),
  
  purchaseTokens: (tokenId, quantity) => Promise.resolve({
    success: true,
    transaction_id: 'tx_' + Date.now()
  }),
  
  sellTokens: (tokenId, quantity, price) => Promise.resolve({
    success: true,
    listing_id: 'listing_' + Date.now()
  })
};

const useTokens = () => {
  const { user, isAuthenticated } = useAuth();
  const [tokens, setTokens] = useState([]);
  const [userTokens, setUserTokens] = useState([]);
  const [marketplaceTokens, setMarketplaceTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });

  // Fetch all tokens
  const fetchAllTokens = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API call
      const data = await mockTokenAPI.getAllTokens();
      setTokens(data);
      
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching tokens:', error);
      setError(error.message || 'Failed to fetch tokens');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's owned tokens
  const fetchUserTokens = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      setLoading(true);
      const data = await mockTokenAPI.getUserTokens(user.id);
      setUserTokens(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching user tokens:', error);
      setError(error.message || 'Failed to fetch user tokens');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  // Fetch marketplace tokens (tokens available for purchase)
  const fetchMarketplaceTokens = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mockTokenAPI.getMarketplaceTokens();
      setMarketplaceTokens(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching marketplace tokens:', error);
      setError(error.message || 'Failed to fetch marketplace tokens');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get token by ID
  const getTokenById = useCallback(async (tokenId) => {
    try {
      setLoading(true);
      const token = await mockTokenAPI.getTokenById(tokenId);
      return { success: true, token };
    } catch (error) {
      console.error('Error fetching token:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Search tokens
  const searchTokens = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const results = await mockTokenAPI.searchTokens(query);
      setSearchResults(results);
      return { success: true, results };
    } catch (error) {
      console.error('Error searching tokens:', error);
      setError(error.message || 'Search failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Purchase tokens
  const purchaseTokens = useCallback(async (tokenId, quantity, paymentMethod = 'card') => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please log in to purchase tokens' };
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await mockTokenAPI.purchaseTokens(tokenId, quantity);
      
      if (result.success) {
        // Refresh user tokens after purchase
        await fetchUserTokens();
        await fetchMarketplaceTokens();
      }
      
      return result;
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      const errorMessage = error.message || 'Purchase failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, fetchUserTokens, fetchMarketplaceTokens]);

  // Sell tokens
  const sellTokens = useCallback(async (tokenId, quantity, pricePerToken) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please log in to sell tokens' };
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await mockTokenAPI.sellTokens(tokenId, quantity, pricePerToken);
      
      if (result.success) {
        // Refresh user tokens after sale
        await fetchUserTokens();
        await fetchMarketplaceTokens();
      }
      
      return result;
    } catch (error) {
      console.error('Error selling tokens:', error);
      const errorMessage = error.message || 'Sale failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, fetchUserTokens, fetchMarketplaceTokens]);

  // Filter tokens
  const filterTokens = useCallback((tokenList, filterOptions = filters) => {
    let filtered = [...tokenList];

    // Filter by category
    if (filterOptions.category !== 'all') {
      filtered = filtered.filter(token => 
        token.project_type?.toLowerCase() === filterOptions.category.toLowerCase()
      );
    }

    // Filter by price range
    if (filterOptions.priceRange !== 'all') {
      const ranges = {
        'under-10': [0, 10],
        '10-50': [10, 50],
        '50-100': [50, 100],
        'over-100': [100, Infinity]
      };
      
      const [min, max] = ranges[filterOptions.priceRange] || [0, Infinity];
      filtered = filtered.filter(token => 
        token.price_per_token >= min && token.price_per_token <= max
      );
    }

    // Sort tokens
    switch (filterOptions.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price_per_token - b.price_per_token);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price_per_token - a.price_per_token);
        break;
      case 'volume':
        filtered.sort((a, b) => (b.volume_24h || 0) - (a.volume_24h || 0));
        break;
      case 'market-cap':
        filtered.sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return filtered;
  }, [filters]);

  // Calculate portfolio value
  const calculatePortfolioValue = useCallback(() => {
    return userTokens.reduce((total, token) => {
      return total + (token.quantity * token.current_price);
    }, 0);
  }, [userTokens]);

  // Get trending tokens
  const getTrendingTokens = useCallback(() => {
    return tokens
      .filter(token => token.volume_24h > 0)
      .sort((a, b) => b.volume_24h - a.volume_24h)
      .slice(0, 10);
  }, [tokens]);

  // Initialize data on mount
  useEffect(() => {
    fetchAllTokens();
    fetchMarketplaceTokens();
  }, [fetchAllTokens, fetchMarketplaceTokens]);

  // Fetch user tokens when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUserTokens();
    }
  }, [isAuthenticated, user?.id, fetchUserTokens]);

  return {
    // Data
    tokens,
    userTokens,
    marketplaceTokens,
    searchResults,
    filters,
    loading,
    error,

    // Actions
    fetchAllTokens,
    fetchUserTokens,
    fetchMarketplaceTokens,
    getTokenById,
    searchTokens,
    purchaseTokens,
    sellTokens,
    setFilters,

    // Utilities
    filterTokens,
    filteredTokens: filterTokens(marketplaceTokens),
    portfolioValue: calculatePortfolioValue(),
    trendingTokens: getTrendingTokens(),
    
    // Helper functions
    clearError: () => setError(null),
    clearSearchResults: () => setSearchResults([]),
  };
};

export { useTokens };