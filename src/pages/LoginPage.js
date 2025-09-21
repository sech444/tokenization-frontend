

// // src/pages/LoginPage.js (Updated with separated EmailLogin component)
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useWalletAuth } from "../contexts/Web3Context";
// import { InlineSpinner } from "../components/common/LoadingSpinner";
// import EmailLogin from "../components/auth/EmailLogin";
// import { Eye, EyeOff, Mail, Lock, Wallet, ArrowRight, ArrowLeft, Shield, Chrome, Facebook, AlertTriangle } from "lucide-react";

// const LoginPage = () => {
//   const {
//     account,
//     isConnected: isWalletConnected,
//     isConnecting,
//     connectAndAuthenticate,
//     disconnect: disconnectWallet,
//     isMetaMaskInstalled,
//     getNetworkName,
//     getFormattedBalance,
//     error: web3Error,
//     clearError: clearWeb3Error,
//     isAuthenticated: isWalletAuthenticated,
//     user: web3User,
//     token: web3Token
//   } = useWalletAuth();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [loginMethod, setLoginMethod] = useState("wallet");
  
//   const navigate = useNavigate();

//   // Determine redirect target based on user role
//   const determineRedirectTarget = useCallback((user) => {
//     if (!user || !user.role) return '/dashboard';
//     return user.role.toLowerCase() === 'admin' ? '/admin' : '/dashboard';
//   }, []);

//   // Monitor wallet authentication state and redirect when complete
//   useEffect(() => {
//     console.log('🔍 Wallet Auth State Check:', {
//       isWalletAuthenticated,
//       hasUser: !!web3User,
//       hasToken: !!web3Token,
//       isWalletConnected,
//       account: account?.slice(0, 8)
//     });

//     // Check for complete wallet authentication
//     if (isWalletAuthenticated && web3User && web3Token && isWalletConnected && account) {
//       console.log('✅ Complete wallet authentication detected, redirecting...');
//       const target = determineRedirectTarget(web3User);
//       console.log('🚀 Redirecting to:', target);
//       navigate(target, { replace: true });
//     }
//   }, [isWalletAuthenticated, web3User, web3Token, isWalletConnected, account, navigate, determineRedirectTarget]);

//   const clearAllErrors = () => {
//     setError('');
//     if (clearWeb3Error) clearWeb3Error();
//   };

//   const handleWalletLogin = async () => {
//     setError('');
//     clearAllErrors();
//     setLoading(true);
    
//     try {
//       console.log('🔄 Starting wallet authentication...');
//       const result = await connectAndAuthenticate();
      
//       if (!result || !result.success) {
//         throw new Error(result?.error || web3Error || 'Authentication failed');
//       }
      
//       console.log('✅ Wallet authentication successful:', result);
//       // Redirect will be handled by useEffect
      
//     } catch (e) {
//       console.error('❌ Wallet authentication error:', e);
//       setError(e.message || 'Connection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper functions
//   const formatAddress = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');

//   // Wallet connection status
//   const getConnectionStatus = () => {
//     if (!isMetaMaskInstalled()) return 'metamask_not_installed';
//     if (!isWalletConnected || !account) return 'not_connected';
//     if (!isWalletAuthenticated || !web3User || !web3Token) return 'connected_not_authenticated';
//     return 'fully_connected';
//   };

//   const renderWalletContent = () => {
//     const status = getConnectionStatus();
    
//     switch (status) {
//       case 'metamask_not_installed':
//         return (
//           <div className="rounded-xl p-4 border border-amber-200 bg-amber-500/20 backdrop-blur-sm">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center">
//                 <AlertTriangle className="w-5 h-5 text-amber-300" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-amber-200">
//                   MetaMask Required
//                 </p>
//                 <p className="text-sm text-amber-300 mt-1">
//                   Install MetaMask to use wallet authentication
//                 </p>
//                 <a 
//                   href="https://metamask.io/download/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center mt-2 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
//                 >
//                   Install MetaMask
//                   <ArrowRight className="w-4 h-4 ml-1" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         );

//       case 'connected_not_authenticated':
//         return (
//           <div className="space-y-4">
//             <div className="rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
//                     <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-white">
//                       Wallet Connected
//                     </p>
//                     <p className="text-xs text-gray-300 font-mono">
//                       {formatAddress(account)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-gray-400">
//                     {getNetworkName()}
//                   </p>
//                   <p className="text-xs font-medium text-gray-300">
//                     {getFormattedBalance()} ETH
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleWalletLogin}
//               disabled={loading || isConnecting}
//               className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
//             >
//               {loading || isConnecting ? (
//                 <>
//                   <InlineSpinner size="sm" color="white" />
//                   <span>Authenticating...</span>
//                 </>
//               ) : (
//                 <>
//                   <Shield className="w-5 h-5" />
//                   <span>Sign Message to Authenticate</span>
//                 </>
//               )}
//             </button>

//             <button
//               onClick={disconnectWallet}
//               disabled={loading}
//               className="w-full py-2 px-4 border border-white/20 text-gray-300 font-medium rounded-lg hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
//             >
//               Disconnect Wallet
//             </button>
//           </div>
//         );

//       case 'fully_connected':
//         return (
//           <div className="rounded-xl p-4 border border-green-400/30 bg-green-500/20 backdrop-blur-sm">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center">
//                 <Shield className="w-5 h-5 text-green-300" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-green-200">
//                   Authentication Successful
//                 </p>
//                 <p className="text-sm text-green-300">
//                   Redirecting to dashboard...
//                 </p>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <button
//             onClick={handleWalletLogin}
//             disabled={isConnecting || loading}
//             className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
//           >
//             {isConnecting || loading ? (
//               <>
//                 <InlineSpinner size="sm" color="white" />
//                 <span>{isConnecting ? 'Connecting...' : 'Authenticating...'}</span>
//               </>
//             ) : (
//               <>
//                 <Wallet className="w-5 h-5" />
//                 <span>Connect with MetaMask</span>
//               </>
//             )}
//           </button>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="absolute inset-0 bg-black opacity-20"></div>
      
//       <div className="relative max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
//             <Shield className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
//           <p className="text-gray-300">
//             Sign in to your account to continue
//           </p>
//         </div>

//         <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
          
//           {/* Login Method Selector */}
//           <div className="flex rounded-xl p-1 mb-8 bg-white bg-opacity-10">
//             <button
//               type="button"
//               onClick={() => {
//                 setLoginMethod('wallet');
//                 clearAllErrors();
//               }}
//               className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
//                 loginMethod === 'wallet' 
//                   ? 'bg-blue-600 text-white shadow-md' 
//                   : 'text-gray-300 hover:text-white'
//               }`}
//             >
//               <Wallet className="w-4 h-4" />
//               <span>Wallet</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setLoginMethod('email');
//                 clearAllErrors();
//               }}
//               className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
//                 loginMethod === 'email' 
//                   ? 'bg-blue-600 text-white shadow-md' 
//                   : 'text-gray-300 hover:text-white'
//               }`}
//             >
//               <Mail className="w-4 h-4" />
//               <span>Email</span>
//             </button>
//           </div>

//           {/* Error Display */}
//           {(error || web3Error) && (
//             <div className="mb-6 rounded-xl p-4 bg-red-500/20 border border-red-500/50">
//               <div className="flex items-start space-x-3">
//                 <div className="w-5 h-5 text-red-300 mt-0.5">
//                   <AlertTriangle className="w-5 h-5" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-red-200">
//                     {error || web3Error}
//                   </p>
//                   <button 
//                     onClick={clearAllErrors}
//                     className="mt-2 text-xs text-red-300 hover:text-red-200 transition-colors"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Wallet Login Section */}
//           {loginMethod === 'wallet' && (
//             <div className="space-y-6">
//               {renderWalletContent()}
              
//               {/* Debug info in development */}
//               {process.env.NODE_ENV === 'development' && (
//                 <div className="text-xs p-3 rounded-lg bg-white/10 text-gray-300 font-mono">
//                   <div>Status: {getConnectionStatus()}</div>
//                   <div>Connected: {isWalletConnected?.toString()}</div>
//                   <div>Auth: {isWalletAuthenticated?.toString()}</div>
//                   <div>User: {web3User?.email || 'null'}</div>
//                   <div>Token: {web3Token ? 'present' : 'null'}</div>
//                   <div>Account: {account?.slice(0, 10) || 'null'}</div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Email Login Section - Now using the separated component */}
//           {loginMethod === 'email' && (
//             <EmailLogin 
//               onError={setError}
//               clearError={() => setError('')}
//             />
//           )}
//         </div>

//         {/* Sign Up Link */}
//         <div className="mt-6 text-center">
//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white border-opacity-20" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-400">
//                 New to TokenPlatform?
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => navigate('/register')}
//             className="inline-flex items-center justify-center w-full sm:w-auto py-3 px-6 border-2 border-blue-400/50 text-blue-300 hover:text-blue-200 font-semibold rounded-xl hover:bg-blue-500/10 hover:border-blue-400/70 transition-all duration-200 backdrop-blur-sm flex space-x-2"
//           >
//             <span>Create new account</span>
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-xs flex items-center justify-center space-x-1">
//             <Shield className="w-3 h-3" />
//             <span>Your data is secured with end-to-end encryption</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// src/pages/LoginPage.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletAuth } from "../contexts/Web3Context";
import { InlineSpinner } from "../components/common/LoadingSpinner";
import EmailLogin from "../components/auth/EmailLogin";
import { Mail, Wallet, ArrowRight, Shield, AlertTriangle } from "lucide-react";

const LoginPage = () => {
  const {
    account,
    isConnected: isWalletConnected,
    isConnecting,
    connectAndAuthenticate,
    disconnect: disconnectWallet,
    isMetaMaskInstalled,
    getNetworkName,
    getFormattedBalance,
    error: web3Error,
    clearError: clearWeb3Error,
    isAuthenticated: isWalletAuthenticated,
    user: web3User,
    token: web3Token
  } = useWalletAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("wallet");

  const navigate = useNavigate();

  const determineRedirectTarget = useCallback((user) => {
    if (!user || !user.role) return "/dashboard";
    return user.role.toLowerCase() === "admin" ? "/admin" : "/dashboard";
  }, []);

  useEffect(() => {
    if (isWalletAuthenticated && web3User && web3Token && isWalletConnected && account) {
      const target = determineRedirectTarget(web3User);
      navigate(target, { replace: true });
    }
  }, [
    isWalletAuthenticated,
    web3User,
    web3Token,
    isWalletConnected,
    account,
    navigate,
    determineRedirectTarget
  ]);

  const clearAllErrors = () => {
    setError("");
    clearWeb3Error?.();
  };

  const handleWalletLogin = async () => {
    setError("");
    clearAllErrors();
    setLoading(true);
    try {
      const result = await connectAndAuthenticate();
      if (!result?.success) throw new Error(result?.error || web3Error || "Authentication failed");
      // Redirect handled by useEffect
    } catch (e) {
      setError(e.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "");

  const getConnectionStatus = () => {
    if (!isMetaMaskInstalled()) return "metamask_not_installed";
    if (!isWalletConnected || !account) return "not_connected";
    if (!isWalletAuthenticated || !web3User || !web3Token) return "connected_not_authenticated";
    return "fully_connected";
  };

  const renderWalletContent = () => {
    const status = getConnectionStatus();

    switch (status) {
      case "metamask_not_installed":
        return (
          <div className="rounded-xl p-4 border border-amber-200 bg-amber-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-200">MetaMask Required</p>
                <p className="text-sm text-amber-300 mt-1">Install MetaMask to use wallet authentication</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
                >
                  Install MetaMask
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        );

      case "connected_not_authenticated":
        return (
          <div className="space-y-4">
            <div className="rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Wallet Connected</p>
                    <p className="text-xs text-gray-300 font-mono">{formatAddress(account)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{getNetworkName()}</p>
                  <p className="text-xs font-medium text-gray-300">{getFormattedBalance()} ETH</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleWalletLogin}
              disabled={loading || isConnecting}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading || isConnecting ? (
                <>
                  <InlineSpinner size="sm" color="white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Sign Message to Authenticate</span>
                </>
              )}
            </button>

            <button
              onClick={disconnectWallet}
              disabled={loading}
              className="w-full py-2 px-4 border border-white/20 text-gray-300 font-medium rounded-lg hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
            >
              Disconnect Wallet
            </button>
          </div>
        );

      case "fully_connected":
        return (
          <div className="rounded-xl p-4 border border-green-400/30 bg-green-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-200">Authentication Successful</p>
                <p className="text-sm text-green-300">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <button
            onClick={handleWalletLogin}
            disabled={isConnecting || loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isConnecting || loading ? (
              <>
                <InlineSpinner size="sm" color="white" />
                <span>{isConnecting ? "Connecting..." : "Authenticating..."}</span>
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                <span>Connect with MetaMask</span>
              </>
            )}
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in to your account to continue</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
          <div className="flex rounded-xl p-1 mb-8 bg-white bg-opacity-10">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("wallet");
                clearAllErrors();
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                loginMethod === "wallet" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:text-white"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("email");
                clearAllErrors();
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                loginMethod === "email" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:text-white"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>

          {(error || web3Error) && (
            <div className="mb-6 rounded-xl p-4 bg-red-500/20 border border-red-500/50">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-red-300 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-200">{error || web3Error}</p>
                  <button
                    onClick={clearAllErrors}
                    className="mt-2 text-xs text-red-300 hover:text-red-200 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {loginMethod === "wallet" && (
            <div className="space-y-6">
              {renderWalletContent()}

              {process.env.NODE_ENV === "development" && (
                <div className="text-xs p-3 rounded-lg bg-white/10 text-gray-300 font-mono">
                  <div>Status: {getConnectionStatus()}</div>
                  <div>Connected: {isWalletConnected?.toString()}</div>
                  <div>Auth: {isWalletAuthenticated?.toString()}</div>
                  <div>User: {web3User?.email || web3User?.username || "null"}</div>
                  <div>Token: {web3Token ? "present" : "null"}</div>
                  <div>Account: {account?.slice(0, 10) || "null"}</div>
                </div>
              )}
            </div>
          )}

          {loginMethod === "email" && (
            <EmailLogin onError={setError} clearError={() => setError("")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;