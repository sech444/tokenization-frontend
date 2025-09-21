


// // src/pages/Dashboard.js
// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useAuth } from '../contexts/AuthContext'; 
// import { useNavigate } from 'react-router-dom'; // Add this import
  
// const Dashboard = () => {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate(); // Add this hook
 
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Mock data for demo purposes
//   const mockData = {
//     portfolio: {
//       totalValue: 125000,
//       totalTokens: 12,
//       totalProjects: 3,
//       monthlyGrowth: 8.5
//     },
//     recentTokens: [
//       { id: 1, name: 'Sydney Property Token', symbol: 'SPT', value: 45000, change: 5.2 },
//       { id: 2, name: 'Art Collection NFT', symbol: 'ART', value: 32000, change: -2.1 },
//       { id: 3, name: 'Green Energy Project', symbol: 'GEP', value: 28000, change: 12.3 }
//     ],
//     chartData: [
//       { month: 'Jan', value: 95000 },
//       { month: 'Feb', value: 102000 },
//       { month: 'Mar', value: 98000 },
//       { month: 'Apr', value: 115000 },
//       { month: 'May', value: 125000 }
//     ],
//     allocation: [
//       { name: 'Real Estate', value: 45, color: '#3B82F6' },
//       { name: 'Art & Collectibles', value: 25, color: '#10B981' },
//       { name: 'Energy Projects', value: 20, color: '#8B5CF6' },
//       { name: 'Other', value: 10, color: '#F59E0B' }
//     ],
//     recentActivity: [
//       { id: 1, type: 'buy', token: 'SPT', amount: 100, price: 450, date: '2024-01-15' },
//       { id: 2, type: 'sell', token: 'ART', amount: 50, price: 640, date: '2024-01-14' },
//       { id: 3, type: 'create', token: 'GEP', amount: 1000, price: 28, date: '2024-01-12' }
//     ]
//   };

//   useEffect(() => {
//     // Simulate loading data
//     const timer = setTimeout(() => {
//       setDashboardData(mockData);
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleCreateToken = () => {
//     navigate('/tokens/create-token'); // Updated navigation
//   };

//   const handleNewProject = () => {
//     alert('/projects');
//   };

//   const handleViewMarketplace = () => {
//     navigate('/marketplace'); // Use navigate instead of alert
//   };

//   const handleViewProjects = () => {
//     alert('Navigate to Projects');
//   };

//   const handleViewProfile = () => {
//     navigate('/profile'); // Use navigate instead of alert
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
//           <p className="text-blue-600 font-medium">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Welcome Header */}
//         <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 lg:p-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold">T</span>
//                 </div>
//                 <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Welcome back, {user?.first_name || user?.name || 'User'}!
//                 </h1>
//               </div>
//               <p className="text-gray-600 text-lg">
//                 Here's an overview of your tokenization portfolio
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={handleCreateToken}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 Create Token
//               </button>
//               <button
//                 onClick={handleNewProject}
//                 className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 New Project
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
//             <div className="flex items-center">
//               <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
//                 <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">Total Portfolio</p>
//                 <p className="text-2xl lg:text-3xl font-bold text-gray-900">
//                   ${dashboardData?.portfolio.totalValue.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4 p-2 bg-green-50 rounded-lg">
//               <span className="text-green-700 text-sm font-semibold flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//                 +{dashboardData?.portfolio.monthlyGrowth}% this month
//               </span>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
//             <div className="flex items-center">
//               <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
//                 <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">Active Tokens</p>
//                 <p className="text-2xl lg:text-3xl font-bold text-gray-900">
//                   {dashboardData?.portfolio.totalTokens}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
//             <div className="flex items-center">
//               <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
//                 <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">Projects</p>
//                 <p className="text-2xl lg:text-3xl font-bold text-gray-900">
//                   {dashboardData?.portfolio.totalProjects}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4 flex space-x-1">
//               <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
//               <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
//               <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg border border-yellow-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
//             <div className="flex items-center">
//               <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
//                 <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 mb-1">Monthly ROI</p>
//                 <p className="text-2xl lg:text-3xl font-bold text-gray-900">
//                   {dashboardData?.portfolio.monthlyGrowth}%
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                 Excellent Performance
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
//           <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
//             <nav className="flex space-x-8 px-6">
//               <button
//                 onClick={() => setActiveTab('overview')}
//                 className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
//                   activeTab === 'overview'
//                     ? 'border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Portfolio Overview
//               </button>
//               <button
//                 onClick={() => setActiveTab('tokens')}
//                 className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
//                   activeTab === 'tokens'
//                     ? 'border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 My Tokens
//               </button>
//               <button
//                 onClick={() => setActiveTab('activity')}
//                 className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
//                   activeTab === 'activity'
//                     ? 'border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Recent Activity
//               </button>
//             </nav>
//           </div>

//           <div className="p-6 lg:p-8">
//             {/* Portfolio Overview Tab */}
//             {activeTab === 'overview' && (
//               <div className="grid lg:grid-cols-2 gap-8">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                     <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
//                     Portfolio Value Over Time
//                   </h3>
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={dashboardData?.chartData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                         <XAxis dataKey="month" stroke="#64748b" />
//                         <YAxis stroke="#64748b" />
//                         <Tooltip 
//                           formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
//                           contentStyle={{ 
//                             backgroundColor: 'white', 
//                             border: '1px solid #e2e8f0', 
//                             borderRadius: '8px',
//                             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                           }}
//                         />
//                         <Line 
//                           type="monotone" 
//                           dataKey="value" 
//                           stroke="url(#gradient)" 
//                           strokeWidth={4}
//                           dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6 }}
//                           activeDot={{ r: 8, fill: '#1D4ED8' }}
//                         />
//                         <defs>
//                           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#3B82F6" />
//                             <stop offset="100%" stopColor="#8B5CF6" />
//                           </linearGradient>
//                         </defs>
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                     <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></div>
//                     Asset Allocation
//                   </h3>
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={dashboardData?.allocation}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={100}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {dashboardData?.allocation.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip 
//                           formatter={(value) => [`${value}%`, 'Allocation']}
//                           contentStyle={{ 
//                             backgroundColor: 'white', 
//                             border: '1px solid #e2e8f0', 
//                             borderRadius: '8px',
//                             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                           }}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="mt-6 grid grid-cols-2 gap-3">
//                     {dashboardData?.allocation.map((item, index) => (
//                       <div key={index} className="flex items-center bg-white rounded-lg p-2">
//                         <div 
//                           className="w-4 h-4 rounded-full mr-3 shadow-sm" 
//                           style={{ backgroundColor: item.color }}
//                         ></div>
//                         <span className="text-sm font-medium text-gray-700">
//                           {item.name}
//                         </span>
//                         <span className="ml-auto text-sm font-bold text-gray-900">
//                           {item.value}%
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* My Tokens Tab */}
//             {activeTab === 'tokens' && (
//               <div>
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center">
//                     <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
//                     Your Token Holdings
//                   </h3>
//                   <button
//                     onClick={handleCreateToken}
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                   >
//                     Create New Token
//                   </button>
//                 </div>
                
//                 <div className="space-y-4">
//                   {dashboardData?.recentTokens.map((token) => (
//                     <div key={token.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
//                             <span className="text-white font-bold text-sm">
//                               {token.symbol.substring(0, 2)}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <h4 className="text-lg font-bold text-gray-900">{token.name}</h4>
//                             <p className="text-sm text-gray-500 font-medium">{token.symbol}</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-lg font-bold text-gray-900">
//                             ${token.value.toLocaleString()}
//                           </p>
//                           <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             token.change >= 0 
//                               ? 'bg-green-100 text-green-800' 
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {token.change >= 0 ? '↗' : '↘'} {token.change >= 0 ? '+' : ''}{token.change}%
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Recent Activity Tab */}
//             {activeTab === 'activity' && (
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
//                   <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full mr-3"></div>
//                   Recent Activity
//                 </h3>
                
//                 <div className="space-y-4">
//                   {dashboardData?.recentActivity.map((activity) => (
//                     <div key={activity.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
//                             activity.type === 'buy' ? 'bg-gradient-to-r from-green-500 to-green-600' :
//                             activity.type === 'sell' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
//                           }`}>
//                             {activity.type === 'buy' && (
//                               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//                               </svg>
//                             )}
//                             {activity.type === 'sell' && (
//                               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//                               </svg>
//                             )}
//                             {activity.type === 'create' && (
//                               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                               </svg>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <p className="text-lg font-bold text-gray-900 capitalize">
//                               {activity.type === 'create' ? 'Created' : activity.type} {activity.token}
//                             </p>
//                             <p className="text-sm text-gray-500 font-medium">
//                               {activity.amount.toLocaleString()} tokens @ ${activity.price}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-lg font-bold text-gray-900">
//                             ${(activity.amount * activity.price).toLocaleString()}
//                           </p>
//                           <p className="text-sm text-gray-500 font-medium">{activity.date}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <button
//                     onClick={() => alert('View all activity')}
//                     className="text-blue-600 hover:text-blue-500 font-semibold text-lg transition-colors duration-200"
//                   >
//                     View all activity →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 lg:p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//             <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
//             Quick Actions
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <button
//               onClick={handleViewMarketplace}
//               className="flex items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1"
//             >
//               <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h4 className="text-lg font-bold text-gray-900">Browse Marketplace</h4>
//                 <p className="text-sm text-gray-600">Discover new investment opportunities</p>
//               </div>
//             </button>

//             <button
//               onClick={handleViewProjects}
//               className="flex items-center p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1"
//             >
//               <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h4 className="text-lg font-bold text-gray-900">View Projects</h4>
//                 <p className="text-sm text-gray-600">Manage your tokenization projects</p>
//               </div>
//             </button>

//             <button
//               onClick={handleViewProfile}
//               className="flex items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1"
//             >
//               <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h4 className="text-lg font-bold text-gray-900">Profile & KYC</h4>
//                 <p className="text-sm text-gray-600">Update profile and verify identity</p>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Additional Features Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 lg:p-8 text-white">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h3 className="text-2xl font-bold mb-4">Ready to tokenize your assets?</h3>
//               <p className="text-blue-100 mb-6 text-lg">
//                 Turn your real-world assets into digital tokens and unlock new investment opportunities.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={handleCreateToken}
//                   className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   Start Tokenizing
//                 </button>
//                 <button
//                   onClick={handleViewMarketplace}
//                   className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold"
//                 >
//                   Explore Market
//                 </button>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
//                 </svg>
//               </div>
//               <p className="text-blue-100 font-medium">Join thousands of users tokenizing assets worldwide</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';
  
const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
 
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data for demo purposes
  const mockData = {
    portfolio: {
      totalValue: 125000,
      totalTokens: 12,
      totalProjects: 3,
      monthlyGrowth: 8.5
    },
    recentTokens: [
      { id: 1, name: 'Sydney Property Token', symbol: 'SPT', value: 45000, change: 5.2 },
      { id: 2, name: 'Art Collection NFT', symbol: 'ART', value: 32000, change: -2.1 },
      { id: 3, name: 'Green Energy Project', symbol: 'GEP', value: 28000, change: 12.3 }
    ],
    chartData: [
      { month: 'Jan', value: 95000 },
      { month: 'Feb', value: 102000 },
      { month: 'Mar', value: 98000 },
      { month: 'Apr', value: 115000 },
      { month: 'May', value: 125000 }
    ],
    allocation: [
      { name: 'Real Estate', value: 45, color: '#3B82F6' },
      { name: 'Art & Collectibles', value: 25, color: '#10B981' },
      { name: 'Energy Projects', value: 20, color: '#8B5CF6' },
      { name: 'Other', value: 10, color: '#F59E0B' }
    ],
    recentActivity: [
      { id: 1, type: 'buy', token: 'SPT', amount: 100, price: 450, date: '2024-01-15' },
      { id: 2, type: 'sell', token: 'ART', amount: 50, price: 640, date: '2024-01-14' },
      { id: 3, type: 'create', token: 'GEP', amount: 1000, price: 28, date: '2024-01-12' }
    ]
  };

  // Check for dark mode on component mount
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(theme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleCreateToken = () => {
    navigate('/tokens/create-token');
  };

  const handleNewProject = () => {
    navigate('/projects/create');
  };

  const handleViewMarketplace = () => {
    navigate('/marketplace');
  };

  const handleViewProjects = () => {
    navigate('/projects');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleViewAllActivity = () => {
    navigate('/activity');
  };

  const handleTokenClick = (tokenId) => {
    navigate(`/tokens/${tokenId}`);
  };

  const handleManageTokens = () => {
    navigate('/tokens');
  };

  const handlePortfolioAnalytics = () => {
    navigate('/analytics');
  };

  const handleInvestmentSettings = () => {
    navigate('/settings/investment');
  };

  const handleKYCVerification = () => {
    navigate('/profile/kyc');
  };

  const handleNotifications = () => {
    navigate('/notifications');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mb-4 ${
            isDarkMode 
              ? 'border-slate-600 border-t-blue-400' 
              : 'border-blue-200 border-t-blue-600'
          }`}></div>
          <p className={`font-medium ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 lg:p-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className={`rounded-xl shadow-lg border p-6 lg:p-8 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-blue-100'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <h1 className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                  Welcome back, {user?.first_name || user?.name || 'User'}!
                </h1>
              </div>
              <p className={`text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Here's an overview of your tokenization portfolio
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreateToken}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create Token
              </button>
              <button
                onClick={handleNewProject}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={handlePortfolioAnalytics}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-blue-100'
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>Total Portfolio</p>
                <p className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ${dashboardData?.portfolio.totalValue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 p-2 bg-green-50 rounded-lg">
              <span className="text-green-700 text-sm font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +{dashboardData?.portfolio.monthlyGrowth}% this month
              </span>
            </div>
          </div>

          <div 
            onClick={handleManageTokens}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-green-100'
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>Active Tokens</p>
                <p className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dashboardData?.portfolio.totalTokens}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className={`w-full rounded-full h-2 ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>

          <div 
            onClick={handleViewProjects}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-purple-100'
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>Projects</p>
                <p className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dashboardData?.portfolio.totalProjects}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>

          <div 
            onClick={handlePortfolioAnalytics}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-yellow-100'
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>Monthly ROI</p>
                <p className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {dashboardData?.portfolio.monthlyGrowth}%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Excellent Performance
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`rounded-xl shadow-lg border overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-blue-100'
        }`}>
          <div className={`border-b ${
            isDarkMode 
              ? 'border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700' 
              : 'border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'overview'
                    ? `border-blue-500 text-blue-600 rounded-t-lg ${
                        isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                      }`
                    : `border-transparent hover:border-gray-300 ${
                        isDarkMode 
                          ? 'text-slate-400 hover:text-slate-300' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`
                }`}
              >
                Portfolio Overview
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'tokens'
                    ? `border-blue-500 text-blue-600 rounded-t-lg ${
                        isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                      }`
                    : `border-transparent hover:border-gray-300 ${
                        isDarkMode 
                          ? 'text-slate-400 hover:text-slate-300' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`
                }`}
              >
                My Tokens
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'activity'
                    ? `border-blue-500 text-blue-600 rounded-t-lg ${
                        isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                      }`
                    : `border-transparent hover:border-gray-300 ${
                        isDarkMode 
                          ? 'text-slate-400 hover:text-slate-300' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`
                }`}
              >
                Recent Activity
              </button>
            </nav>
          </div>

          <div className="p-6 lg:p-8">
            {/* Portfolio Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className={`rounded-xl p-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-600' 
                    : 'bg-gradient-to-br from-blue-50 to-blue-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
                    Portfolio Value Over Time
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dashboardData?.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#475569' : '#e2e8f0'} />
                        <XAxis dataKey="month" stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                        <YAxis stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#334155' : 'white', 
                            border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            color: isDarkMode ? '#f8fafc' : '#0f172a'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="url(#gradient)" 
                          strokeWidth={4}
                          dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6 }}
                          activeDot={{ r: 8, fill: '#1D4ED8' }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={`rounded-xl p-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-600' 
                    : 'bg-gradient-to-br from-purple-50 to-purple-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></div>
                    Asset Allocation
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dashboardData?.allocation}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {dashboardData?.allocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Allocation']}
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#334155' : 'white', 
                            border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            color: isDarkMode ? '#f8fafc' : '#0f172a'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {dashboardData?.allocation.map((item, index) => (
                      <div key={index} className={`flex items-center rounded-lg p-2 ${
                        isDarkMode ? 'bg-slate-800' : 'bg-white'
                      }`}>
                        <div 
                          className="w-4 h-4 rounded-full mr-3 shadow-sm" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {item.name}
                        </span>
                        <span className={`ml-auto text-sm font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Tokens Tab */}
            {activeTab === 'tokens' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                  <h3 className={`text-xl font-bold flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                    Your Token Holdings
                  </h3>
                  <button
                    onClick={handleCreateToken}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Create New Token
                  </button>
                </div>
                
                <div className="space-y-4">
                  {dashboardData?.recentTokens.map((token) => (
                    <div 
                      key={token.id} 
                      onClick={() => handleTokenClick(token.id)}
                      className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 hover:bg-slate-700' 
                          : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {token.symbol.substring(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4 className={`text-lg font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{token.name}</h4>
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-500'
                            }`}>{token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${token.value.toLocaleString()}
                          </p>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            token.change >= 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {token.change >= 0 ? '↗' : '↘'} {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h3 className={`text-xl font-bold mb-8 flex items-center ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full mr-3"></div>
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {dashboardData?.recentActivity.map((activity) => (
                    <div key={activity.id} className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 hover:bg-slate-700' 
                        : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                            activity.type === 'buy' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            activity.type === 'sell' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}>
                            {activity.type === 'buy' && (
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                            {activity.type === 'sell' && (
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                              </svg>
                            )}
                            {activity.type === 'create' && (
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className={`text-lg font-bold capitalize ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {activity.type === 'create' ? 'Created' : activity.type} {activity.token}
                            </p>
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-500'
                            }`}>
                              {activity.amount.toLocaleString()} tokens @ ${activity.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${(activity.amount * activity.price).toLocaleString()}
                          </p>
                          <p className={`text-sm font-medium ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={handleViewAllActivity}
                    className={`font-semibold text-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    View all activity →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl shadow-lg border p-6 lg:p-8 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-blue-100'
        }`}>
          <h3 className={`text-xl font-bold mb-6 flex items-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={handleViewMarketplace}
              className={`flex items-center p-6 border rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-slate-600 hover:bg-slate-700' 
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
              }`}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Browse Marketplace</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>Discover new investment opportunities</p>
              </div>
            </button>

            <button
              onClick={handleViewProjects}
              className={`flex items-center p-6 border rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-slate-600 hover:bg-slate-700' 
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
              }`}
            >
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>View Projects</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>Manage your tokenization projects</p>
              </div>
            </button>

            <button
              onClick={handleViewProfile}
              className={`flex items-center p-6 border rounded-xl hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-slate-600 hover:bg-slate-700' 
                  : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
              }`}
            >
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Profile & KYC</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>Update profile and verify identity</p>
              </div>
            </button>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 lg:p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to tokenize your assets?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Turn your real-world assets into digital tokens and unlock new investment opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCreateToken}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Tokenizing
                </button>
                <button
                  onClick={handleViewMarketplace}
                  className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold"
                >
                  Explore Market
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <p className="text-blue-100 font-medium">Join thousands of users tokenizing assets worldwide</p>
            </div>
          </div>
        </div>

        {/* Additional Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={handleNotifications}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-blue-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-3.5-3.5L15 17zm1.17-7.83L15 8l1.17-1.17zm-6.17 6.5L8.83 14.5 10 15.67z M21 8a2 2 0 01-1 1.73l-7 4a2 2 0 01-2 0l-7-4A2 2 0 013 8V6a2 2 0 011.73-1l7-4a2 2 0 012 0l7 4A2 2 0 0121 6v2z"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Notifications</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>View alerts and updates</p>
            </div>
          </div>

          <div 
            onClick={handleKYCVerification}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-green-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>KYC Verification</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Complete identity verification</p>
            </div>
          </div>

          <div 
            onClick={handlePortfolioAnalytics}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-purple-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Analytics</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Detailed portfolio insights</p>
            </div>
          </div>

          <div 
            onClick={handleInvestmentSettings}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-white border-yellow-100'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Settings</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Investment preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
