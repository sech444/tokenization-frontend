// tokenization-frontend/src/components/common/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue', text = null, className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]} 
            border-4 
            border-gray-200 
            ${colorClasses[color]} 
            border-t-transparent 
            rounded-full 
            animate-spin
          `}
        />
        {/* Inner dot for better visual effect */}
        <div
          className={`
            absolute 
            top-1/2 
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-1/2
            ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'}
            ${colorClasses[color].replace('border-', 'bg-')}
            rounded-full
            opacity-60
          `}
        />
      </div>
      
      {text && (
        <p className={`
          mt-3 
          text-gray-600 
          ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
          font-medium
          animate-pulse
        `}>
          {text}
        </p>
      )}
    </div>
  );
};

// Full page loading spinner for major loading states
export const FullPageSpinner = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <LoadingSpinner 
        size="xl" 
        color="blue" 
        text={text}
        className="bg-white rounded-lg shadow-lg p-8"
      />
    </div>
  );
};

// Inline spinner for small loading states
export const InlineSpinner = ({ size = 'sm', color = 'blue', className = '' }) => {
  return (
    <LoadingSpinner 
      size={size} 
      color={color} 
      className={`inline-flex ${className}`}
    />
  );
};

// Button spinner for loading buttons
export const ButtonSpinner = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      <span>Loading...</span>
    </div>
  );
};

// Card loading skeleton
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

// Table loading skeleton
export const TableSkeleton = ({ rows = 5, columns = 4, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex space-x-4">
            {Array.from({ length: columns }, (_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded flex-1"></div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              {Array.from({ length: columns }, (_, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`h-3 bg-gray-200 rounded flex-1 ${
                    Math.random() > 0.5 ? 'w-3/4' : 'w-full'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading overlay for containers
export const LoadingOverlay = ({ isLoading, children, text = 'Loading...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-10">
          <LoadingSpinner 
            size="lg" 
            color="blue" 
            text={text}
            className="bg-white rounded-lg shadow-lg p-6"
          />
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;




// // Basic usage
// <LoadingSpinner />

// // With custom props
// <LoadingSpinner size="lg" color="green" text="Loading data..." />

// // Full page loading
// <FullPageSpinner text="Setting up your workspace..." />

// // In a button
// <button disabled>
//   <ButtonSpinner />
// </button>

// // Overlay loading
// <LoadingOverlay isLoading={loading}>
//   <YourContent />
// </LoadingOverlay>

// // Card skeleton
// <CardSkeleton />