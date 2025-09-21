// src/pages/MarketplacePage.js

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import MarketplaceHome from '../components/marketplace/MarketplaceHome';
import OrderHistory from '../components/marketplace/OrderHistory';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const { user } = useAuth();

  const tabs = [
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: '🏪',
      component: MarketplaceHome
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: '📋',
      component: OrderHistory
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || MarketplaceHome;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="py-4">
          <ActiveComponent />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MarketplacePage;