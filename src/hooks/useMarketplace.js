// src/hooks/useMarketplace.js - FIXED VERSION

import { useState, useEffect, useCallback } from 'react';
import marketplaceService from '../services/marketplaceService';
import { useAuth } from '../contexts/AuthContext';

export const useMarketplace = () => {
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    total_pages: 0
  });
  const { user } = useAuth();

  // Fetch listings with filters
  const fetchListings = useCallback(async (filters = {}) => {
    console.log('fetchListings called with filters:', filters);
    setLoading(true);
    setError(null);
    try {
      const response = await marketplaceService.getListings({
        page: 1,
        limit: 20,
        ...filters
      });
      
      console.log('Raw API response:', response);
      console.log('Response data:', response.data);
      console.log('Is response.data an array?', Array.isArray(response.data));
      
      // CRITICAL FIX: Ensure listings is always an array
      const listingsData = Array.isArray(response.data) ? response.data : 
                          Array.isArray(response) ? response : [];
      
      console.log('Processed listings data:', listingsData);
      setListings(listingsData);
      
      // Handle pagination data more safely
      setPagination({
        page: response.page || 1,
        limit: response.limit || 20,
        total: response.total || 0,
        total_pages: response.total_pages || 0
      });
      
      console.log('After setting listings, current state:', {
        listings: listingsData,
        pagination: {
          page: response.page || 1,
          limit: response.limit || 20,
          total: response.total || 0,
          total_pages: response.total_pages || 0
        }
      });
      
    } catch (err) {
      console.error('Error in fetchListings:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Failed to fetch listings');
      // Ensure listings remains an array even on error
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user orders
  const fetchOrders = useCallback(async (filters = {}) => {
    console.log('fetchOrders called with filters:', filters);
    setLoading(true);
    setError(null);
    try {
      if (user) {
        console.log('User exists, fetching orders...');
        const response = await marketplaceService.getOrders({
          page: 1,
          limit: 20,
          ...filters
        });
        console.log('Orders response:', response);
        
        // Ensure orders is always an array
        const ordersData = Array.isArray(response.data) ? response.data : 
                          Array.isArray(response) ? response : [];
        setOrders(ordersData);
      } else {
        console.log('No user, setting orders to empty array');
        setOrders([]);
      }
    } catch (err) {
      console.error('Error in fetchOrders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
      // Ensure orders remains an array even on error
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create new listing
  const createListing = useCallback(async (listingData) => {
    console.log('createListing called with:', listingData);
    setLoading(true);
    setError(null);
    try {
      const newListing = await marketplaceService.createListing(listingData);
      console.log('New listing created:', newListing);
      await fetchListings();
      return newListing;
    } catch (err) {
      console.error('Error in createListing:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create listing';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchListings]);

  // Buy tokens
  const buyTokens = useCallback(async (listingId, quantity) => {
    console.log('buyTokens called with:', { listingId, quantity });
    setLoading(true);
    setError(null);
    try {
      const order = await marketplaceService.buyTokens(listingId, quantity);
      console.log('Tokens purchased:', order);
      await Promise.all([fetchListings(), fetchOrders()]);
      return order;
    } catch (err) {
      console.error('Error in buyTokens:', err);
      const errorMessage = err.response?.data?.message || 'Failed to buy tokens';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchListings, fetchOrders]);

  // Load more listings (pagination)
  const loadMoreListings = useCallback(async (filters = {}) => {
    if (pagination.page >= pagination.total_pages) {
      console.log('No more pages to load');
      return;
    }
    
    console.log('loadMoreListings called with:', filters);
    setLoading(true);
    try {
      const response = await marketplaceService.getListings({
        ...filters,
        page: pagination.page + 1,
        limit: pagination.limit
      });
      console.log('Load more response:', response);
      
      // Ensure new data is an array
      const newListingsData = Array.isArray(response.data) ? response.data : 
                             Array.isArray(response) ? response : [];
      
      setListings(prev => {
        console.log('Previous listings:', prev);
        console.log('New listings to add:', newListingsData);
        // Double-check that prev is an array before spreading
        const prevArray = Array.isArray(prev) ? prev : [];
        const combined = [...prevArray, ...newListingsData];
        console.log('Combined listings:', combined);
        return combined;
      });
      
      setPagination({
        page: response.page || pagination.page + 1,
        limit: response.limit || pagination.limit,
        total: response.total || pagination.total,
        total_pages: response.total_pages || pagination.total_pages
      });
    } catch (err) {
      console.error('Error in loadMoreListings:', err);
      setError(err.response?.data?.message || 'Failed to load more listings');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.total_pages, pagination.limit]);

  // Clear error function
  const clearError = useCallback(() => {
    console.log('clearError called');
    setError(null);
  }, []);

  // Initial load
  useEffect(() => {
    console.log('Initial load effect triggered');
    fetchListings();
  }, [fetchListings]);

  // Load orders when user changes
  useEffect(() => {
    console.log('User effect triggered, user:', user);
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user, fetchOrders]);

  // Debug: Log whenever listings state changes
  useEffect(() => {
    console.log('LISTINGS STATE CHANGED:', {
      listings,
      type: typeof listings,
      isArray: Array.isArray(listings),
      length: listings?.length
    });
    
    if (!Array.isArray(listings)) {
      console.error('❌ CRITICAL ERROR: listings is not an array!', listings);
      // Auto-fix: convert to array if somehow it's not
      setListings([]);
    }
  }, [listings]);

  // Safety wrapper for listings to ensure it's always an array
  const safeListings = Array.isArray(listings) ? listings : [];
  const safeOrders = Array.isArray(orders) ? orders : [];

  return {
    listings: safeListings,
    orders: safeOrders,
    loading,
    error,
    pagination,
    fetchListings,
    fetchOrders,
    createListing,
    buyTokens,
    loadMoreListings,
    clearError
  };
};