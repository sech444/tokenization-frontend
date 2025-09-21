// // src/services/marketplaceService.js

// import { marketplaceAPI } from './api';

// class MarketplaceService {
//   // Get all listings with filters
//   async getListings(filters = {}) {
//     try {
//       const params = new URLSearchParams();
      
//       if (filters.token_id) params.append('token_id', filters.token_id);
//       if (filters.listing_type) params.append('listing_type', filters.listing_type);
//       if (filters.min_price) params.append('min_price', filters.min_price);
//       if (filters.max_price) params.append('max_price', filters.max_price);
//       if (filters.page) params.append('page', filters.page);
//       if (filters.limit) params.append('limit', filters.limit);

//       const response = await marketplaceAPI.get(`/marketplace/listings?${params}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching listings:', error);
//       throw error;
//     }
//   }

//   // Create a new listing
//   async createListing(listingData) {
//     try {
//       const response = await marketplaceAPI.post('/marketplace/listings', listingData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating listing:', error);
//       throw error;
//     }
//   }

//   // Buy tokens from a listing
//   async buyTokens(listingId, quantity) {
//     try {
//       const response = await api.post('/marketplace/buy', {
//         listing_id: listingId,
//         quantity: quantity
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error buying tokens:', error);
//       throw error;
//     }
//   }

//   // Get user's orders
//   async getOrders(filters = {}) {
//     try {
//       const params = new URLSearchParams();
      
//       if (filters.user_id) params.append('user_id', filters.user_id);
//       if (filters.status) params.append('status', filters.status);
//       if (filters.page) params.append('page', filters.page);
//       if (filters.limit) params.append('limit', filters.limit);

//       const response = await marketplaceAPI.get(`/marketplace/orders?${params}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       throw error;
//     }
//   }

//   // Get listing by ID
//   async getListingById(listingId) {
//     try {
//       const response = await marketplaceAPI.get(`/marketplace/listings/${listingId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching listing:', error);
//       throw error;
//     }
//   }
// }


// export default new MarketplaceService();


// src/services/marketplaceService.js

import { marketplaceAPI } from './api';

class MarketplaceService {
  // Get all listings with filters
  async getListings(filters = {}) {
    try {
      const response = await marketplaceAPI.getListings(filters);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching listings:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch listings'
      };
    }
  }

  // Create a new listing
  async createListing(listingData) {
    try {
      const response = await marketplaceAPI.createListing(listingData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error creating listing:', error);
      return {
        success: false,
        error: error.message || 'Failed to create listing'
      };
    }
  }

  // Get listing by ID
  async getListingById(listingId) {
    try {
      const response = await marketplaceAPI.getListing(listingId);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching listing:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch listing'
      };
    }
  }

  // Update listing
  async updateListing(listingId, listingData) {
    try {
      const response = await marketplaceAPI.updateListing(listingId, listingData);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error updating listing:', error);
      return {
        success: false,
        error: error.message || 'Failed to update listing'
      };
    }
  }

  // Delete listing
  async deleteListing(listingId) {
    try {
      const response = await marketplaceAPI.deleteListing(listingId);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error deleting listing:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete listing'
      };
    }
  }

  // Buy tokens from a listing
  async buyTokens(listingId, quantity) {
    try {
      const response = await marketplaceAPI.buyTokens(listingId, quantity);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error buying tokens:', error);
      return {
        success: false,
        error: error.message || 'Failed to buy tokens'
      };
    }
  }

  // Get user's orders
  async getOrders(filters = {}) {
    try {
      const response = await marketplaceAPI.getOrders(filters);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch orders'
      };
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const response = await marketplaceAPI.getOrder(orderId);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch order'
      };
    }
  }

  // Helper method to format listing data
  formatListingData(rawListing) {
    return {
      id: rawListing.id,
      token_id: rawListing.token_id,
      seller_id: rawListing.seller_id,
      listing_type: rawListing.listing_type, // 'sell' or 'buy'
      quantity: rawListing.quantity,
      price_per_token: rawListing.price_per_token,
      total_price: rawListing.total_price,
      status: rawListing.status, // 'active', 'completed', 'cancelled'
      created_at: rawListing.created_at,
      updated_at: rawListing.updated_at,
      expires_at: rawListing.expires_at,
      // Additional computed fields
      is_expired: new Date(rawListing.expires_at) < new Date(),
      formatted_price: `$${rawListing.price_per_token}`,
      formatted_total: `$${rawListing.total_price}`
    };
  }

  // Helper method to format order data
  formatOrderData(rawOrder) {
    return {
      id: rawOrder.id,
      buyer_id: rawOrder.buyer_id,
      seller_id: rawOrder.seller_id,
      listing_id: rawOrder.listing_id,
      token_id: rawOrder.token_id,
      quantity: rawOrder.quantity,
      price_per_token: rawOrder.price_per_token,
      total_amount: rawOrder.total_amount,
      status: rawOrder.status, // 'pending', 'completed', 'failed', 'cancelled'
      payment_method: rawOrder.payment_method,
      transaction_hash: rawOrder.transaction_hash,
      created_at: rawOrder.created_at,
      updated_at: rawOrder.updated_at,
      // Additional computed fields
      formatted_amount: `$${rawOrder.total_amount}`,
      is_pending: rawOrder.status === 'pending',
      is_completed: rawOrder.status === 'completed'
    };
  }

  // Get marketplace statistics
  async getMarketplaceStats() {
    try {
      // This would typically be a separate API endpoint
      // For now, we'll aggregate from existing data
      const listingsResponse = await this.getListings({ limit: 1000 });
      const ordersResponse = await this.getOrders({ limit: 1000 });

      if (!listingsResponse.success || !ordersResponse.success) {
        throw new Error('Failed to fetch marketplace data');
      }

      const listings = listingsResponse.data.listings || [];
      const orders = ordersResponse.data.orders || [];

      const stats = {
        total_listings: listings.length,
        active_listings: listings.filter(l => l.status === 'active').length,
        total_orders: orders.length,
        completed_orders: orders.filter(o => o.status === 'completed').length,
        total_volume: orders
          .filter(o => o.status === 'completed')
          .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
        average_price: listings.length > 0 
          ? listings.reduce((sum, l) => sum + parseFloat(l.price_per_token || 0), 0) / listings.length
          : 0
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error fetching marketplace stats:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch marketplace statistics'
      };
    }
  }

  // Search listings with advanced filters
  async searchListings(searchParams = {}) {
    try {
      const filters = {
        ...searchParams,
        // Add default pagination if not provided
        page: searchParams.page || 1,
        limit: searchParams.limit || 20
      };

      const response = await this.getListings(filters);

      if (response.success) {
        // Format the listings data
        const formattedListings = response.data.listings?.map(listing => 
          this.formatListingData(listing)
        ) || [];

        return {
          success: true,
          data: {
            ...response.data,
            listings: formattedListings
          }
        };
      }

      return response;
    } catch (error) {
      console.error('Error searching listings:', error);
      return {
        success: false,
        error: error.message || 'Failed to search listings'
      };
    }
  }
}

export default new MarketplaceService();