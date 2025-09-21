// // tokenization-frontend/src/components/auth/ProtectedLayout.js

// import { useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// export default function ProtectedLayout({ children }) {
//   const { isAuthenticated, loading } = useAuth();
//   const nav = useNavigate();
//   const location = useLocation();
//   const hasNavigated = useRef(false);

//   useEffect(() => {
//     if (!loading && !isAuthenticated && location.pathname !== '/login' && !hasNavigated.current) {
//       hasNavigated.current = true;
      
//       // Use setTimeout to avoid navigation during render
//       const timeoutId = setTimeout(() => {
//         nav('/login', { replace: true });
//       }, 0);
      
//       return () => clearTimeout(timeoutId);
//     }
    
//     // Reset navigation flag when user becomes authenticated
//     if (isAuthenticated) {
//       hasNavigated.current = false;
//     }
//   }, [isAuthenticated, loading, nav, location.pathname]);

//   if (loading) return <div>Loading...</div>; // show loader until auth is resolved
//   if (!isAuthenticated && location.pathname !== '/login') return null;

//   return <>{children}</>;
// }


// src/components/auth/ProtectedLayout.js
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useWeb3 } from "../../contexts/Web3Context";

export default function ProtectedLayout({ children }) {
  const { isAuthenticated: isAuthUser, loading: authLoading } = useAuth();
  const {
    isAuthenticated: isWalletAuthenticated,
    user: web3User,
    loading: walletLoading,
  } = useWeb3();

  const nav = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  const isLoading = authLoading || walletLoading;
  const hasAccess = isAuthUser || (isWalletAuthenticated && web3User);

  useEffect(() => {
    if (!isLoading && !hasAccess && location.pathname !== "/login" && !hasNavigated.current) {
      hasNavigated.current = true;

      // Delay navigation slightly to avoid state update during render
      const timeoutId = setTimeout(() => {
        nav("/login", { replace: true });
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    if (hasAccess) {
      hasNavigated.current = false;
    }
  }, [isLoading, hasAccess, nav, location.pathname]);

  if (isLoading) return <div>Loading...</div>;
  if (!hasAccess && location.pathname !== "/login") return null;

  return <>{children}</>;
}
