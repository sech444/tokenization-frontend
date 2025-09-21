

// import React, { useState, useEffect } from 'react';
// import { 
//   Users, 
//   Coins, 
//   Building, 
//   ShoppingCart, 
//   Shield, 
//   Activity, 
//   Settings, 
//   LogOut, 
//   Bell,
//   Search,
//   Filter,
//   Plus,
//   Eye,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   BarChart3,
//   Menu,
//   X,
//   CreditCard,
//   FileText,
//   PieChart,
//   Download,
//   Upload,
//   Calendar,
//   Clock,
//   ChevronDown,
//   MoreHorizontal
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [tokens, setTokens] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [pendingKyc, setPendingKyc] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [notificationOpen, setNotificationOpen] = useState(false);

  

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     setLoading(true);
//     // Simulate API calls
//     setTimeout(() => {
//       setUsers([
//         { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', kycStatus: 'approved', joinDate: '2024-01-15', balance: '$12,450', trades: 42 },
//         { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', kycStatus: 'pending', joinDate: '2024-01-20', balance: '$8,720', trades: 28 },
//         { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive', kycStatus: 'rejected', joinDate: '2024-01-25', balance: '$23,100', trades: 67 },
//         { id: 4, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', kycStatus: 'approved', joinDate: '2024-02-01', balance: '$5,430', trades: 15 },
//         { id: 5, name: 'Mike Chen', email: 'mike@example.com', status: 'active', kycStatus: 'approved', joinDate: '2024-02-05', balance: '$17,890', trades: 53 }
//       ]);

//       setTokens([
//         { id: 1, name: 'Sydney Office Tower', symbol: 'SOT', totalSupply: 1000000, currentPrice: 125.50, marketCap: 125500000, type: 'Real Estate', change: '+5.2%', volume: '$2.4M' },
//         { id: 2, name: 'Melbourne Retail Complex', symbol: 'MRC', totalSupply: 500000, currentPrice: 89.25, marketCap: 44625000, type: 'Real Estate', change: '+2.8%', volume: '$1.2M' },
//         { id: 3, name: 'Tech Startup Fund', symbol: 'TSF', totalSupply: 2000000, currentPrice: 15.75, marketCap: 31500000, type: 'Business', change: '-1.5%', volume: '$890K' },
//         { id: 4, name: 'Brisbane Apartments', symbol: 'BAP', totalSupply: 750000, currentPrice: 42.30, marketCap: 31725000, type: 'Real Estate', change: '+3.7%', volume: '$1.5M' },
//         { id: 5, name: 'Perth Industrial', symbol: 'PID', totalSupply: 850000, currentPrice: 28.75, marketCap: 24437500, type: 'Industrial', change: '+0.8%', volume: '$650K' }
//       ]);

//       setProjects([
//         { id: 1, name: 'Sydney CBD Development', type: 'Real Estate', status: 'active', totalValue: 50000000, tokenized: 75, location: 'Sydney, AU', progress: 75, investors: 142 },
//         { id: 2, name: 'Austin Tech Hub', type: 'Business', status: 'pending', totalValue: 25000000, tokenized: 0, location: 'Austin, USA', progress: 15, investors: 0 },
//         { id: 3, name: 'Brisbane Apartments', type: 'Real Estate', status: 'completed', totalValue: 35000000, tokenized: 100, location: 'Brisbane, AU', progress: 100, investors: 89 },
//         { id: 4, name: 'Melbourne Retail Park', type: 'Retail', status: 'active', totalValue: 42000000, tokenized: 60, location: 'Melbourne, AU', progress: 60, investors: 116 },
//         { id: 5, name: 'Adelaide Logistics Center', type: 'Industrial', status: 'planning', totalValue: 28000000, tokenized: 10, location: 'Adelaide, AU', progress: 10, investors: 23 }
//       ]);

//       setPendingKyc([
//         { id: 1, userName: 'Alice Johnson', email: 'alice@example.com', submittedDate: '2024-02-01', documents: ['ID', 'Proof of Address'], riskLevel: 'Low', daysPending: 2 },
//         { id: 2, userName: 'Mike Chen', email: 'mike@example.com', submittedDate: '2024-02-02', documents: ['Passport', 'Bank Statement'], riskLevel: 'Medium', daysPending: 1 },
//         { id: 3, userName: 'Sarah Davis', email: 'sarah@example.com', submittedDate: '2024-02-03', documents: ['Driver License', 'Utility Bill'], riskLevel: 'High', daysPending: 1 }
//       ]);

//       setOrders([
//         { id: 1, type: 'Buy', token: 'SOT', amount: 1000, price: 125.50, total: 125500, status: 'completed', user: 'John Doe', date: '2024-02-04', time: '10:23 AM' },
//         { id: 2, type: 'Sell', token: 'MRC', amount: 500, price: 89.25, total: 44625, status: 'pending', user: 'Jane Smith', date: '2024-02-04', time: '11:45 AM' },
//         { id: 3, type: 'Buy', token: 'TSF', amount: 2500, price: 15.75, total: 39375, status: 'completed', user: 'Bob Wilson', date: '2024-02-03', time: '02:15 PM' },
//         { id: 4, type: 'Buy', token: 'BAP', amount: 1200, price: 42.30, total: 50760, status: 'completed', user: 'Alice Johnson', date: '2024-02-03', time: '04:50 PM' },
//         { id: 5, type: 'Sell', token: 'PID', amount: 800, price: 28.75, total: 23000, status: 'failed', user: 'Mike Chen', date: '2024-02-02', time: '09:30 AM' }
//       ]);

//       setNotifications([
//         { id: 1, title: 'New KYC Submission', description: 'Alice Johnson submitted KYC documents', time: '10 mins ago', read: false },
//         { id: 2, title: 'Token Minted', description: '500,000 MRC tokens minted successfully', time: '2 hours ago', read: false },
//         { id: 3, title: 'Large Trade Executed', description: 'John Doe purchased 1,000 SOT tokens', time: '5 hours ago', read: true },
//         { id: 4, title: 'New Project Added', description: 'Adelaide Logistics Center project created', time: 'Yesterday', read: true }
//       ]);

//       setLoading(false);
//     }, 1000);
//   }, []);

//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//     { id: 'users', label: 'User Management', icon: Users },
//     { id: 'kyc', label: 'KYC Approval', icon: Shield },
//     { id: 'tokens', label: 'Token Management', icon: Coins },
//     { id: 'projects', label: 'Projects', icon: Building },
//     { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
//     { id: 'analytics', label: 'Analytics', icon: Activity },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
//     <div className="card">
//       <div className="flex items-center justify-between p-2">
//         <div>
//           <p className="text-sm font-medium text-tertiary">{title}</p>
//           <p className="text-3xl font-bold text-primary mt-2">{value}</p>
//           {change && (
//             <div className={`flex items-center mt-2 text-sm ${changeType === 'increase' ? 'text-success' : 'text-error'}`}>
//               {changeType === 'increase' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
//               {change}
//             </div>
//           )}
//         </div>
//         <div className={`p-3 rounded-full ${color}`}>
//           <Icon className="w-6 h-6 text-inverse" />
//         </div>
//       </div>
//     </div>
//   );

//   const DashboardView = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
//         <div className="flex space-x-3">
//           <button className="btn btn-secondary">
//             <Download className="w-4 h-4 mr-2" />
//             Export Report
//           </button>
//           <button className="btn btn-primary">
//             Generate Report
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Users"
//           value="12,543"
//           change="+12.5%"
//           changeType="increase"
//           icon={Users}
//           color="bg-blue-500"
//         />
//         <StatCard
//           title="Active Tokens"
//           value="47"
//           change="+3"
//           changeType="increase"
//           icon={Coins}
//           color="bg-green-500"
//         />
//         <StatCard
//           title="Total Volume"
//           value="$125.4M"
//           change="+8.2%"
//           changeType="increase"
//           icon={DollarSign}
//           color="bg-purple-500"
//         />
//         <StatCard
//           title="Pending KYC"
//           value="23"
//           change="-15%"
//           changeType="decrease"
//           icon={Shield}
//           color="bg-orange-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
//         <div className="card lg:col-span-2">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-primary p-2">Recent Transactions</h3>
//             <button className="text-sm text-primary hover:text-primary-hover p-2">View All</button>
//           </div>
//           <div className="space-y-4">
//             {orders.slice(0, 5).map(order => (
//               <div key={order.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                     order.type === 'Buy' ? 'bg-success-light' : 'bg-error-light'
//                   }`}>
//                     {order.type === 'Buy' ? 
//                       <TrendingUp className={`w-5 h-5 ${order.type === 'Buy' ? 'text-success' : 'text-error'}`} /> : 
//                       <TrendingDown className={`w-5 h-5 ${order.type === 'Buy' ? 'text-success' : 'text-error'}`} />
//                     }
//                   </div>
//                   <div>
//                     <p className="font-medium text-primary">{order.token} - {order.type}</p>
//                     <p className="text-sm text-tertiary">{order.user}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-primary">${order.total.toLocaleString()}</p>
//                   <div className="flex items-center text-sm text-tertiary">
//                     <Clock className="w-3 h-3 mr-1" />
//                     {order.date} • {order.time}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="card">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-primary p-2">Top Performing Tokens</h3>
//             <button className="text-sm text-primary hover:text-primary-hover p-2">View All</button>
//           </div>
//           <div className="space-y-4">
//             {tokens.slice(0, 5).map(token => (
//               <div key={token.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
//                 <div>
//                   <p className="font-medium text-primary">{token.name}</p>
//                   <p className="text-sm text-tertiary">{token.symbol}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-primary">${token.currentPrice}</p>
//                   <div className={`flex items-center text-sm ${token.change.includes('+') ? 'text-success' : 'text-error'}`}>
//                     {token.change.includes('+') ? 
//                       <TrendingUp className="w-4 h-4 mr-1" /> : 
//                       <TrendingDown className="w-4 h-4 mr-1" />
//                     }
//                     {token.change}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const UsersView = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">User Management</h1>
//         <div className="flex space-x-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="pl-10 pr-4 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             />
//           </div>
//           <button className="btn btn-secondary">
//             <Filter className="w-4 h-4 mr-2" />
//             Filter
//           </button>
//           <button className="btn btn-primary">
//             <Plus className="w-4 h-4 mr-2" />
//             Add User
//           </button>
//         </div>
//       </div>

//       <div className="card overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-surface">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">User</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">KYC</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Balance</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Join Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-background divide-y divide-gray-200">
//             {users.map(user => (
//               <tr key={user.id} className="hover:bg-surface">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div>
//                     <div className="text-sm font-medium text-primary">{user.name}</div>
//                     <div className="text-sm text-tertiary">{user.email}</div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`badge ${
//                     user.kycStatus === 'approved' ? 'badge-success' :
//                     user.kycStatus === 'pending' ? 'badge-warning' : 'badge-error'
//                   }`}>
//                     {user.kycStatus}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
//                   {user.balance}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-tertiary">{user.joinDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                     <button className="text-primary hover:text-primary-hover">
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button className="text-error hover:text-error-hover">
//                       <XCircle className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const KYCView = () => (
//     <div className="space-y-6">
//       <div className="flex  items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">KYC Approval Queue</h1>
//         <div className="flex items-center space-x-4 text-sm text-tertiary">
//           <AlertTriangle className=" w-4 h-4 " />
//           {pendingKyc.length} pending reviews
//         </div>
//       </div>

//       <div className="grid gap-6">
//         {pendingKyc.map(kyc => (
//           <div key={kyc.id} className="card">
//             <div className="flex p-4  items-center justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-primary">{kyc.userName}</h3>
//                 <p className="text-sm text-tertiary">{kyc.email}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className={`badge ${
//                   kyc.riskLevel === 'Low' ? 'badge-success' :
//                   kyc.riskLevel === 'Medium' ? 'badge-warning' : 'badge-error'
//                 }`}>
//                   {kyc.riskLevel} Risk
//                 </span>
//                 <span className="text-xs text-tertiary">
//                   {kyc.daysPending} day{kyc.daysPending !== 1 ? 's' : ''} pending
//                 </span>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <p className="text-sm pl-4 font-medium text-primary">Submitted</p>
//                 <p className="text-sm pl-4 text-tertiary">{kyc.submittedDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-primary">Documents</p>
//                 <div className="flex flex-wrap gap-1 mt-1">
//                   {kyc.documents.map((doc, idx) => (
//                     <span key={idx} className="badge badge-outline">
//                       {doc}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-primary">Actions</p>
//                 <div className="flex space-x-2 mt-1">
//                   <button className="btn btn-success btn-sm">
//                     <CheckCircle className="w-4 h-4 mr-1" />
//                     Approve
//                   </button>
//                   <button className="btn btn-error btn-sm">
//                     <XCircle className="w-4 h-4 mr-1" />
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="flex pl-4 pb-4 space-x-3">
//               <button className="btn btn-secondary">
//                 <Eye className="w-4 h-4 mr-2" />
//                 Review Documents
//               </button>
//               <button className="btn btn-outline">
//                 Request Additional Info
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const TokensView = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">Token Management</h1>
//         <button className="btn btn-primary">
//           <Plus className="w-4 h-4 mr-2" />
//           Create Token
//         </button>
//       </div>

//       <div className="card overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-surface">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Token</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Supply</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Market Cap</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">24h Change</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-background divide-y divide-gray-200">
//             {tokens.map(token => (
//               <tr key={token.id} className="hover:bg-surface">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div>
//                     <div className="text-sm font-medium text-primary">{token.name}</div>
//                     <div className="text-sm text-tertiary">{token.symbol}</div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="badge badge-outline">
//                     {token.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
//                   {token.totalSupply.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
//                   ${token.currentPrice}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
//                   ${token.marketCap.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`text-sm font-medium ${token.change.includes('+') ? 'text-success' : 'text-error'}`}>
//                     {token.change}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                     <button className="text-primary hover:text-primary-hover">Edit</button>
//                     <button className="text-success hover:text-success-hover">Mint</button>
//                     <button className="text-error hover:text-error-hover">Burn</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const ProjectsView = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">Projects</h1>
//         <button className="btn btn-primary">
//           <Plus className="w-4 h-4 mr-2" />
//           New Project
//         </button>
//       </div>

//       <div className="grid gap-6">
//         {projects.map(project => (
//           <div key={project.id} className="card">
//             <div className="flex items-center justify-between mb-4 p-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
//                 <p className="text-sm text-tertiary">{project.location}</p>
//               </div>
//               <span className={`badge ${
//                 project.status === 'active' ? 'badge-success' :
//                 project.status === 'pending' ? 'badge-warning' : 
//                 project.status === 'completed' ? 'badge-primary' : 'badge-outline'
//               }`}>
//                 {project.status}
//               </span>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//               <div>
//                 <p className="text-sm font-medium text-primary p-4">Type</p>
//                 <p className="text-sm text-tertiary p-4">{project.type}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-primary">Total Value</p>
//                 <p className="text-sm text-tertiary">${project.totalValue.toLocaleString()}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-primary">Investors</p>
//                 <p className="text-sm text-tertiary">{project.investors}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-primary">Tokenized</p>
//                 <div className="flex items-center space-x-2">
//                   <div className="flex-1 bg-surface rounded-full h-2">
//                     <div 
//                       className="bg-primary h-2 rounded-full" 
//                       style={{ width: `${project.tokenized}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-sm text-tertiary">{project.tokenized}%</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-3 p-4">
//               <button className="btn btn-primary ">
//                 Tokenize
//               </button>
//               <button className="btn btn-outline">
//                 View Details
//               </button>
//               <button className="btn btn-ghost">
//                 <MoreHorizontal className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const MarketplaceView = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">Marketplace Orders</h1>
//         <div className="flex space-x-3">
//           <button className="btn btn-secondary">
//             <Download className="w-4 h-4 mr-2" />
//             Export Orders
//           </button>
//           <button className="btn btn-primary">
//             Create Listing
//           </button>
//         </div>
//       </div>

//       <div className="card overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-surface">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Order</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">User</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Token</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Amount</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Total</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">Date & Time</th>
//             </tr>
//           </thead>
//           <tbody className="bg-background divide-y divide-gray-200">
//             {orders.map(order => (
//               <tr key={order.id} className="hover:bg-surface">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`badge ${order.type === 'Buy' ? 'badge-success' : 'badge-error'}`}>
//                     {order.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.user}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.token}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.amount.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">${order.total.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`badge ${
//                     order.status === 'completed' ? 'badge-success' :
//                     order.status === 'pending' ? 'badge-warning' : 'badge-error'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-tertiary">
//                   {order.date} • {order.time}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardView />;
//       case 'users':
//         return <UsersView />;
//       case 'kyc':
//         return <KYCView />;
//       case 'tokens':
//         return <TokensView />;
//       case 'projects':
//         return <ProjectsView />;
//       case 'marketplace':
//         return <MarketplaceView />;
//       case 'analytics':
//         return (
//           <div className="text-center py-12">
//             <BarChart3 className="w-16 h-16 text-tertiary mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-primary mb-2">Analytics Dashboard</h3>
//             <p className="text-tertiary">Advanced analytics and reporting features coming soon.</p>
//           </div>
//         );
//       case 'settings':
//         return (
//           <div className="text-center py-12">
//             <Settings className="w-16 h-16 text-tertiary mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-primary mb-2">Settings</h3>
//             <p className="text-tertiary">Platform configuration and settings panel.</p>
//           </div>
//         );
//       default:
//         return <DashboardView />;
//     }
//   };

//   const NotificationDropdown = () => (
//     <div className="absolute right-0 mt-2 w-80 bg-background rounded-lg shadow-lg border border-default z-50">
//       <div className="p-4 border-b border-default">
//         <h3 className="text-lg font-semibold text-primary">Notifications</h3>
//       </div>
//       <div className="max-h-96 overflow-y-auto">
//         {notifications.length > 0 ? (
//           notifications.map(notification => (
//             <div key={notification.id} className={`p-4 border-b border-default ${!notification.read ? 'bg-surface' : ''}`}>
//               <div className="flex justify-between">
//                 <h4 className="text-sm font-medium text-primary">{notification.title}</h4>
//                 <span className="text-xs text-tertiary">{notification.time}</span>
//               </div>
//               <p className="text-sm text-tertiary mt-1">{notification.description}</p>
//             </div>
//           ))
//         ) : (
//           <div className="p-4 text-center text-tertiary">
//             No notifications
//           </div>
//         )}
//       </div>
//       <div className="p-4 border-t border-default">
//         <button className="text-sm text-primary hover:text-primary-hover w-full text-center">
//           Mark all as read
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
//           <div className="relative flex-1 flex flex-col max-w-xs w-full bg-surface">
//             <div className="absolute top-0 right-0 -mr-12 pt-2">
//               <button
//                 className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <X className="h-6 w-6 text-white" />
//               </button>
//             </div>
//             <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
//               <div className="flex-shrink-0 flex items-center px-4">
//                 <h2 className="text-xl font-bold text-primary">TokenPlatform</h2>
//               </div>
//               <nav className="mt-5 px-2 space-y-1">
//                 {sidebarItems.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <button
//                       key={item.id}
//                       onClick={() => {
//                         setActiveTab(item.id);
//                         setSidebarOpen(false);
//                       }}
//                       className={`${
//                         activeTab === item.id
//                           ? 'bg-primary text-inverse'
//                           : 'text-tertiary hover:bg-surface-hover hover:text-primary'
//                       } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
//                     >
//                       <Icon className="mr-4 h-6 w-6" />
//                       {item.label}
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>
//             <div className="flex-shrink-0 flex border-t border-default p-4">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//                   <span className="text-inverse font-medium text-sm">AD</span>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-primary">Admin User</p>
//                   <p className="text-xs text-tertiary">admin@tokenplatform.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Desktop sidebar */}
//       <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
//         <div className="flex-1 flex flex-col min-h-0 bg-surface border-r border-default">
//           <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <h2 className="text-xl font-bold text-primary">TokenPlatform</h2>
//             </div>
//             <nav className="mt-5 flex-1 px-2 space-y-1">
//               {sidebarItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`${
//                       activeTab === item.id
//                         ? 'bg-primary text-inverse'
//                         : 'text-tertiary hover:bg-surface-hover hover:text-primary'
//                     } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
//                   >
//                     <Icon className="mr-3 h-5 w-5" />
//                     {item.label}
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//           <div className="flex-shrink-0 flex border-t border-default p-4">
//             <div className="flex items-center w-full">
//               <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//                 <span className="text-inverse font-medium text-sm">AD</span>
//               </div>
//               <div className="ml-3 flex-1">
//                 <p className="text-sm font-medium text-primary">Admin User</p>
//                 <p className="text-xs text-tertiary">admin@tokenplatform.com</p>
//               </div>
//               <button className="text-tertiary hover:text-primary">
//                 <LogOut className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64 flex flex-col flex-1">
//         {/* Top navigation */}
//         <div className="sticky top-0 z-10 bg-surface shadow-sm border-b border-default">
//           <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
//             <button
//               className="lg:hidden"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu className="h-6 w-6 text-tertiary" />
//             </button>
            
//             <div className="flex-1 max-w-2xl mx-auto hidden md:block">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search across platform..."
//                   className="w-full pl-10 pr-4 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button 
//                   className="p-2 text-tertiary hover:text-primary relative"
//                   onClick={() => setNotificationOpen(!notificationOpen)}
//                 >
//                   <Bell className="h-6 w-6" />
//                   {notifications.filter(n => !n.read).length > 0 && (
//                     <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error ring-2 ring-surface"></span>
//                   )}
//                 </button>
//                 {notificationOpen && <NotificationDropdown />}
//               </div>
              
//               <button className="btn btn-ghost">
//                 <LogOut className="h-5 w-5 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="py-6 px-4 sm:px-6 lg:px-8">
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//               </div>
//             ) : (
//               renderContent()
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";


import  Button  from '../../components/ui/button'; // expects "button.js"
import { Card, CardContent } from '../../components/ui/card.js';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs.js';

import KYCApproval from "./KYCApproval";
import UserManagement from "./UserManagement";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Card className="shadow-lg rounded-2xl">
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid grid-cols-2 gap-2 mb-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="kyc">KYC Approvals</TabsTrigger>
            </TabsList>

            {/* User Management Tab */}
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            {/* KYC Approvals Tab */}
            <TabsContent value="kyc">
              <KYCApproval />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

