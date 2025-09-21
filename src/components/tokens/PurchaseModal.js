// tokenization-frontend/src/components/tokens/PurchaseModal.js

import React, { useState } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { AlertCircle, Wallet } from 'lucide-react';

// PurchaseModal Component  
const PurchaseModal = ({ token, amount, onAmountChange, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { purchaseTokens } = useTokens();

  const totalCost = amount * token.price_per_token;
  const maxPurchase = Math.min(token.available_supply, 1000); // Limit to available or 1000

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await purchaseTokens(token.id, amount);
      if (result.success) {
        alert(`Successfully purchased ${amount} ${token.symbol} tokens!`);
        onClose();
      } else {
        alert('Purchase failed: ' + result.error);
      }
    } catch (error) {
      alert('Purchase failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Purchase Tokens</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Token Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {token.symbol.substring(0, 2)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{token.name}</div>
              <div className="text-gray-500 text-sm">{token.symbol} • ${token.price_per_token.toFixed(2)} per token</div>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tokens
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max={maxPurchase}
                value={amount}
                onChange={(e) => onAmountChange(Math.max(1, Math.min(maxPurchase, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                tokens
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Min: 1 token</span>
              <span>Max: {maxPurchase.toLocaleString()} tokens</span>
            </div>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 10, 50, 100].map(preset => (
                <button
                  key={preset}
                  onClick={() => onAmountChange(Math.min(preset, maxPurchase))}
                  disabled={preset > maxPurchase}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    amount === preset
                      ? 'bg-blue-500 text-white border-blue-500'
                      : preset > maxPurchase
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'crypto', label: 'Cryptocurrency', icon: '₿' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`px-4 py-3 text-sm rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                    paymentMethod === method.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Purchase Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tokens:</span>
                <span className="font-semibold">{amount.toLocaleString()} {token.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per token:</span>
                <span className="font-semibold">${token.price_per_token.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform fee (2.5%):</span>
                <span className="font-semibold">${(totalCost * 0.025).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-gray-900">${(totalCost * 1.025).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800 mb-1">Important Notice:</p>
                <p>Token investments carry risk. Past performance does not guarantee future results. Please read the project documentation carefully before investing.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={loading || amount < 1 || amount > maxPurchase}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Confirm Purchase
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;