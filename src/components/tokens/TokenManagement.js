// tokenization-frontend/src/components/tokens/TokenManagement.js

import React, { useState } from 'react';
import { ShoppingCart, Wallet, Star } from 'lucide-react';
import TokenList from './TokenList';
import PortfolioOverview from './PortfolioOverview';
import TokenCreator from './TokenCreator';

const TokenManagement = () => {
  const [activeTab, setActiveTab] = useState('marketplace');

  const tabs = [
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'portfolio', label: 'My Portfolio', icon: Wallet },
    { id: 'create', label: 'Create Token', icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'marketplace' && <TokenList />}
      {activeTab === 'portfolio' && <PortfolioOverview />}
      {activeTab === 'create' && <TokenCreator />}
    </div>
  );
};

export default TokenManagement;