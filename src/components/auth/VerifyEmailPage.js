import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { InlineSpinner } from '../../components/common/LoadingSpinner';
import { Mail, CheckCircle, XCircle, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  
  const [verificationState, setVerificationState] = useState('verifying'); // 'verifying', 'success', 'error', 'expired'
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setVerificationState('error');
        setErrorMessage('Invalid verification link. No token provided.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await verifyEmail(token);
        
        if (response.verified) {
          setVerificationState('success');
          toast.success('Email verified successfully!');
        } else {
          setVerificationState('error');
          setErrorMessage(response.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        
        if (error.message?.includes('expired')) {
          setVerificationState('expired');
          setErrorMessage('Verification link has expired');
        } else if (error.message?.includes('already verified')) {
          setVerificationState('success');
          setErrorMessage('Email is already verified');
        } else {
          setVerificationState('error');
          setErrorMessage(error.message || 'Verification failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleVerification();
  }, [token, verifyEmail]);

  const handleResendVerification = () => {
    navigate('/resend-verification', { 
      state: { email: email } 
    });
  };

  const renderVerifyingState = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-500 bg-opacity-20 mb-6">
        <Mail className="h-10 w-10 text-blue-300 animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Verifying Your Email...
      </h2>
      
      <p className="text-gray-300 text-lg mb-6">
        Please wait while we verify your email address.
      </p>
      
      <div className="flex justify-center">
        <InlineSpinner />
      </div>
    </div>
  );

  const renderSuccessState = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500 bg-opacity-20 mb-6 animate-bounce">
        <CheckCircle className="h-10 w-10 text-green-300" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Email Verified Successfully! ✅
      </h2>
      
      <p className="text-gray-300 text-lg mb-6">
        Your email has been verified. You can now log in to your account and start exploring tokenized assets.
      </p>
      
      {email && (
        <p className="text-blue-300 font-semibold text-lg mb-6">
          {email}
        </p>
      )}
      
      <div className="bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-white mb-3 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          What's Next?
        </h3>
        <ol className="text-left text-gray-300 space-y-2 text-sm max-w-md mx-auto">
          <li className="flex items-start">
            <span className="font-bold text-green-300 mr-2">1.</span>
            <span>Log in to your account using your credentials</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-green-300 mr-2">2.</span>
            <span>Complete your profile setup</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-green-300 mr-2">3.</span>
            <span>Start exploring and investing in tokenized assets</span>
          </li>
        </ol>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => navigate('/login')}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>Go to Login</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-gray-200 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500 bg-opacity-20 mb-6">
        <XCircle className="h-10 w-10 text-red-300" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Verification Failed ❌
      </h2>
      
      <p className="text-gray-300 text-lg mb-4">
        We couldn't verify your email address.
      </p>
      
      <p className="text-red-300 font-medium text-base mb-6">
        {errorMessage}
      </p>
      
      <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-white mb-3 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          What Can You Do?
        </h3>
        <ul className="text-left text-gray-300 space-y-2 text-sm max-w-md mx-auto">
          <li className="flex items-start">
            <span className="font-bold text-red-300 mr-2">•</span>
            <span>Request a new verification email</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-300 mr-2">•</span>
            <span>Check if the link has expired</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-red-300 mr-2">•</span>
            <span>Contact support if the problem persists</span>
          </li>
        </ul>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handleResendVerification}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Resend Verification Email</span>
        </button>
        
        <button
          onClick={() => navigate('/login')}
          className="w-full px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-gray-200 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );

  const renderExpiredState = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-500 bg-opacity-20 mb-6">
        <XCircle className="h-10 w-10 text-yellow-300" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Link Expired ⏰
      </h2>
      
      <p className="text-gray-300 text-lg mb-4">
        This verification link has expired for security reasons.
      </p>
      
      <p className="text-yellow-300 font-medium text-base mb-6">
        Verification links expire after 24 hours to keep your account secure.
      </p>
      
      <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-white mb-3 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          Get a New Link
        </h3>
        <p className="text-gray-300 text-sm max-w-md mx-auto">
          Request a new verification email to complete your account setup. 
          The new link will be valid for another 24 hours.
        </p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handleResendVerification}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Get New Verification Link</span>
        </button>
        
        <button
          onClick={() => navigate('/login')}
          className="w-full px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-gray-200 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (verificationState) {
      case 'verifying':
        return renderVerifyingState();
      case 'success':
        return renderSuccessState();
      case 'expired':
        return renderExpiredState();
      case 'error':
      default:
        return renderErrorState();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;