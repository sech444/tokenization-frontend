import React from 'react';
import { Home, ArrowLeft, Search, HelpCircle, Compass } from 'lucide-react';

const PageNotFound = () => {
  const suggestions = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/marketplace', label: 'Marketplace', icon: Search },
    { path: '/features', label: 'Features', icon: Compass },
    { path: '/contact', label: 'Contact', icon: HelpCircle }
  ];

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      // You can implement search functionality here
      console.log('Search for:', e.target.value);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-primary opacity-20 mb-4">
            404
          </div>
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-primary rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-16 h-16 md:w-20 md:h-20 text-primary opacity-60 animate-spin" style={{
                animation: 'spin 3s linear infinite'
              }} />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-text-tertiary">
            Don't worry, it happens to the best of us. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a 
              href="/" 
              className="btn btn-primary btn-lg inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back Home
            </a>
            <button 
              onClick={goBack} 
              className="btn btn-secondary btn-lg"
            >
              Previous Page
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Try these popular pages instead:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestions.map((suggestion, index) => (
              <a
                key={index}
                href={suggestion.path}
                className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="card-body text-center py-6">
                  <suggestion.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <span className="text-sm font-medium text-text-primary">
                    {suggestion.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-surface-elevated rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Looking for something specific?
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search our platform..."
              className="form-input pl-12 pr-4"
              onKeyPress={handleSearchKeyPress}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          </div>
          <p className="text-sm text-text-tertiary mt-2">
            Press Enter to search or contact support if you need help
          </p>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-text-muted">
          <p>
            If you believe this is an error, please{' '}
            <a href="/contact" className="text-primary hover:underline">
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;