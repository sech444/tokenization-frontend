// src/components/tokens/TokenCreator.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { tokenAPI } from '../../services/api';
import { Star } from 'lucide-react';
import { downloadFile, downloadFileAsync, copyToClipboard } from '../../lib/utils';


const TokenCreatorComponent = () => {
  const location = useLocation();
  const projectId = location.state?.projectId || ""; // ✅ projectId passed from ProjectDetails

  const [formData, setFormData] = useState({
    project_id: projectId,
    name: "",
    symbol: "",
    description: "",
    totalSupply: "",
    pricePerToken: "",
    category: "Technology"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!projectId || projectId.length !== 36) { // UUID v4 length = 36
        throw new Error("Missing or invalid project_id. Please start from a project.");
      }

      // 🔹 Blockchain transaction (stubbed for now)
      const tx = await downloadFileAsync(); 
      const receipt = await tx.wait();

      // 🔹 Payload with correct keys for backend
      const payload = {
        project_id: projectId,
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        total_supply: parseInt(formData.totalSupply, 10),
        initial_price: parseFloat(formData.pricePerToken),
        token_type: "fungible", // default, could add dropdown
        decimals: 18, // default ERC20
        metadata: {},
        metadata_uri: null,
        compliance_rules: {},
        contract_address: null, // backend may set after deployment
        tx_hash: receipt.transactionHash,
      };

      // 🔹 API call
      const response = await tokenAPI.createToken(payload);

      alert(`✅ Token created!\n\nAddress: ${response.tokenAddress}\nTx Hash: ${response.txHash}`);
    } catch (error) {
      console.error("Token creation failed:", error);
      alert(`❌ Failed to create token: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-600 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Token</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Define your token’s details before launching it on the blockchain.
          </p>
        </div>

        {/* Show linked project */}
        {projectId && (
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Creating token for project: <span className="font-semibold">{projectId}</span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Token Name & Symbol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Green Energy Fund"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="e.g., GEF"
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project, its purpose, and why people should invest..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Supply, Price, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Supply
              </label>
              <input
                type="number"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleChange}
                placeholder="1000000"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price per Token ($)
              </label>
              <input
                type="number"
                name="pricePerToken"
                value={formData.pricePerToken}
                onChange={handleChange}
                placeholder="10.00"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="Technology">Technology</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Energy">Energy</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          {formData.name && formData.symbol && (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Token Preview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Market Cap:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                    ${((parseFloat(formData.totalSupply) || 0) * (parseFloat(formData.pricePerToken) || 0)).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Category:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white">{formData.category}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 
              rounded-xl text-lg font-semibold transition-all duration-200 
              flex items-center justify-center gap-2"
          >
            <Star className="w-5 h-5" />
            {loading ? "Creating..." : "Create Token"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenCreatorComponent;
