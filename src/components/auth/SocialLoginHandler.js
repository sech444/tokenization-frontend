// src/components/auth/SocialLoginHandler.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SocialLoginHandler = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');
  const { loginWithSocial } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSocialCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const provider = searchParams.get('provider') || 'google';

      if (error) {
        setError(`Authentication failed: ${error}`);
        setStatus('error');
        return;
      }

      if (!code) {
        setError('No authorization code received');
        setStatus('error');
        return;
      }

      try {
        const result = await loginWithSocial(provider, code);
        
        if (result.success) {
          setStatus('success');
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 1500);
        } else {
          setError(result.error || 'Social login failed');
          setStatus('error');
        }
      } catch (error) {
        console.error('Social login callback error:', error);
        setError('Authentication failed. Please try again.');
        setStatus('error');
      }
    };

    handleSocialCallback();
  }, [searchParams, loginWithSocial, navigate]);

  const handleRetry = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-primary)'
    }}>
      <div className="max-w-md w-full space-y-8 text-center">
        {status === 'processing' && (
          <div>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary-color)' }}></div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Completing Sign In
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Please wait while we authenticate your account...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="rounded-full h-16 w-16 bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">
              Success!
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              You're being redirected to your dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="rounded-full h-16 w-16 bg-red-100 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Authentication Failed
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all hover:opacity-80"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLoginHandler;