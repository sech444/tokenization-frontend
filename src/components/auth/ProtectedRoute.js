// // tokenization-frontend/src/components/auth/ProtectedRoute.js

// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const ProtectedRoute = ({ 
//   children, 
//   adminOnly = false, 
//   requireRole = null, 
//   requireKYC = false 
// }) => {
//   const { isAuthenticated, user, isLoading } = useAuth();
//   const location = useLocation();

//   // Show loading spinner while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <Navigate 
//         to="/login" 
//         state={{ from: location.pathname }} 
//         replace 
//       />
//     );
//   }

//   // Handle legacy adminOnly prop
//   const requiredRole = adminOnly ? 'admin' : requireRole;

//   // Check role-based access
//   if (requiredRole && user?.role !== requiredRole) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
//           <div className="text-red-500 text-6xl mb-4">🚫</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
//           <p className="text-gray-600 mb-2">
//             You don't have permission to access this page.
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             Required role: <strong>{requiredRole}</strong><br />
//             Your role: <strong>{user?.role || 'None'}</strong>
//           </p>
//           <div className="space-x-2">
//             <button 
//               onClick={() => window.history.back()}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               Go Back
//             </button>
//             <button 
//               onClick={() => window.location.href = '/'}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               Go Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Check KYC requirement
//   if (requireKYC && user?.kyc_status !== 'approved') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
//           <div className="text-yellow-500 text-6xl mb-4">📋</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification Required</h2>
//           <p className="text-gray-600 mb-2">
//             You need to complete KYC verification to access this page.
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             Current KYC Status: <strong>{user?.kyc_status || 'Not Started'}</strong>
//           </p>
//           <div className="space-x-2">
//             <button 
//               onClick={() => window.location.href = '/profile?tab=kyc'}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               Complete KYC
//             </button>
//             <button 
//               onClick={() => window.history.back()}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Render the protected content
//   return children;
// };

// export default ProtectedRoute;


// tokenization-frontend/src/components/auth/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWeb3 } from '../../contexts/Web3Context';

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  requireRole = null, 
  requireKYC = false 
}) => {
  // Check both authentication contexts
  const { isAuthenticated: isEmailAuth, user: emailUser, loading: emailLoading } = useAuth();
  const { isAuthenticated: isWalletAuth, user: walletUser, isConnecting } = useWeb3();
  
  const location = useLocation();

  // Combine authentication states
  const isAuthenticated = isEmailAuth || isWalletAuth;
  const user = emailUser || walletUser;
  const isLoading = emailLoading || isConnecting;

  // Debug logging (remove in production)
  console.log('🛡️ ProtectedRoute Check:', {
    isEmailAuth,
    isWalletAuth,
    isAuthenticated,
    hasEmailUser: !!emailUser,
    hasWalletUser: !!walletUser,
    finalUser: user?.email || user?.username,
    userRole: user?.role,
    isLoading
  });

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-300 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    console.log('🚫 Not authenticated, redirecting to login');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Handle legacy adminOnly prop
  const requiredRole = adminOnly ? 'admin' : requireRole;

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    console.log('🚫 Role check failed:', { required: requiredRole, actual: user?.role });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md mx-auto text-center p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Required role: <strong className="text-blue-300">{requiredRole}</strong><br />
            Your role: <strong className="text-blue-300">{user?.role || 'None'}</strong>
          </p>
          <div className="space-x-2">
            <button 
              onClick={() => window.history.back()}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check KYC requirement
  if (requireKYC && user?.kyc_status !== 'approved') {
    console.log('🚫 KYC check failed:', { status: user?.kyc_status });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md mx-auto text-center p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
          <div className="text-yellow-400 text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-white mb-2">KYC Verification Required</h2>
          <p className="text-gray-300 mb-2">
            You need to complete KYC verification to access this page.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Current KYC Status: <strong className="text-yellow-300">{user?.kyc_status || 'Not Started'}</strong>
          </p>
          <div className="space-x-2">
            <button 
              onClick={() => window.location.href = '/profile?tab=kyc'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Complete KYC
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log('✅ ProtectedRoute passed, rendering children for user:', user?.email || user?.username);
  
  // Render the protected content
  return children;
};

export default ProtectedRoute;