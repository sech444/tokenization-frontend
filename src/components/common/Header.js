

// src/components/common/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Re-add this
import { useWeb3 } from "../../contexts/Web3Context";
import { InlineSpinner } from "./LoadingSpinner";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    logout: false,
    themeToggle: false,
    mobileMenu: false,
    navigation: {}
  });

  // ✅ Use BOTH contexts
  const { user: authUser, logout: authLogout, isAuthenticated: isAuthAuthenticated } = useAuth();
  const { user: web3User, disconnect: web3Disconnect, isAuthenticated: isWalletAuthenticated } = useWeb3();

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check both authentication methods
  const user = authUser || (isWalletAuthenticated ? web3User : null);
  const isAuthenticated = isAuthAuthenticated || isWalletAuthenticated;

  const isAdminRole = (role) => role && role.toLowerCase() === "admin";
  const userIsAdmin = user && isAdminRole(user.role);

  useEffect(() => {
    setIsDarkMode(false);
    document.documentElement.setAttribute("data-theme", "light");
    document.body.classList.remove("dark-theme");
  }, []);

  const setLoading = (key, value) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const setNavigationLoading = (route, value) => {
    setLoadingStates(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        [route]: value
      }
    }));
  };

  const toggleTheme = async () => {
    setLoading('themeToggle', true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    document.body.classList.toggle("dark-theme", next);
    setLoading('themeToggle', false);
  };

  const toggleMobileMenu = async () => {
    setLoading('mobileMenu', true);
    await new Promise(resolve => setTimeout(resolve, 150));
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setLoading('mobileMenu', false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ✅ Handle logout for both authentication methods
  const handleLogout = async () => {
    setLoading('logout', true);
    try {
      if (authUser) {
        await authLogout();
      } else if (web3User) {
        await web3Disconnect();
      }
      closeMobileMenu();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading('logout', false);
    }
  };

  const handleNavigation = async (path) => {
    setNavigationLoading(path, true);
    await new Promise(resolve => setTimeout(resolve, 200));
    setNavigationLoading(path, false);
    closeMobileMenu();
  };

  const isActiveRoute = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinkWithLoading = ({ to, children, className, onClick, ...props }) => {
    const isLoading = loadingStates.navigation[to];
    return (
      <Link 
        to={to} 
        className={className}
        onClick={(e) => {
          if (onClick) onClick(e);
          handleNavigation(to);
        }}
        {...props}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isLoading && <InlineSpinner size="sm" color="blue" />}
          {children}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Your existing styles remain the same */}
      <style jsx="true">{`
        /* All your existing styles... */
        :root {
          --primary-color: #3b82f6;
          --primary-hover: #2563eb;
          --secondary-color: #8b5cf6;
          --background-color: #ffffff;
          --surface-color: #f8fafc;
          --surface-elevated: #ffffff;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --text-inverse: #ffffff;
          --border-color: #e2e8f0;
          --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --gradient-primary: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          --gradient-active: linear-gradient(135deg, var(--primary-hover) 0%, var(--secondary-color) 100%);
          --transition-fast: 150ms ease;
          --radius-lg: 0.75rem;
          --radius-full: 9999px;
          --active-bg: rgba(59, 130, 246, 0.1);
          --active-border: var(--primary-color);
        }

        [data-theme="dark"] {
          --primary-color: #60a5fa;
          --secondary-color: #a78bfa;
          --background-color: #191f2cff;
          --surface-color: #202731ff;
          --surface-elevated: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --border-color: #475569;
          --active-bg: rgba(96, 165, 250, 0.15);
        }

        body {
          background-color: var(--background-color) !important;
          color: var(--text-primary) !important;
        }

        body.dark-theme {
          background-color: var(--background-color) !important;
          color: var(--text-primary) !important;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow);
        }

        [data-theme="dark"] .header {
          background: rgba(15, 23, 42, 0.9);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.25rem;
          transition: all var(--transition-fast);
        }

        .brand:hover {
          color: var(--primary-color);
        }

        .logo {
          width: 2.5rem;
          height: 2.5rem;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all var(--transition-fast);
        }

        .brand:hover .logo {
          background: var(--gradient-active);
          transform: scale(1.05);
        }

        .logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          max-width: 500px;
          margin: 0 1.5rem;
          gap: 0.5rem;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity var(--transition-fast);
          border-radius: var(--radius-full);
        }

        .nav-link:hover {
          color: var(--text-inverse);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link.active {
          color: var(--primary-color);
          background: var(--active-bg);
          border-color: var(--active-border);
          font-weight: 600;
        }

        .nav-link.active::before {
          opacity: 0;
        }

        .nav-link.active:hover {
          color: var(--text-inverse);
        }

        .nav-link.active:hover::before {
          opacity: 1;
        }

        .nav-link span {
          position: relative;
          z-index: 1;
        }

        .admin-badge {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          font-size: 0.6rem;
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
          font-weight: 600;
          margin-left: 0.375rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: var(--surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .theme-toggle::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity var(--transition-fast);
          border-radius: var(--radius-full);
        }

        .theme-toggle:hover {
          border-color: var(--primary-color);
          color: var(--text-inverse);
        }

        .theme-toggle:hover::before {
          opacity: 1;
        }

        .theme-toggle:active {
          transform: scale(0.95);
        }

        .theme-toggle:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .theme-toggle span {
          position: relative;
          z-index: 1;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          font-weight: 500;
          font-size: 0.8rem;
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          border: 1px solid transparent;
          cursor: pointer;
          background: none;
          position: relative;
          overflow: hidden;
          gap: 0.5rem;
        }

        .btn:active {
          transform: scale(0.95);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-outline {
          color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .btn-outline:hover {
          background: var(--primary-color);
          color: var(--text-inverse);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary {
          background: var(--gradient-primary);
          color: var(--text-inverse);
        }

        .btn-primary:hover {
          background: var(--gradient-active);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transform: translateY(-1px);
        }

        .btn-danger {
          color: #ef4444;
          border-color: #ef4444;
        }

        .btn-danger:hover {
          background: #ef4444;
          color: var(--text-inverse);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          padding: 0.375rem 0.75rem;
          background: var(--active-bg);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 2.5rem;
          height: 2.5rem;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          cursor: pointer;
          gap: 0.25rem;
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .hamburger::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity var(--transition-fast);
          border-radius: var(--radius-lg);
        }

        .hamburger:hover {
          border-color: var(--primary-color);
        }

        .hamburger:hover::before {
          opacity: 1;
        }

        .hamburger:hover .hamburger-line {
          background: var(--text-inverse);
        }

        .hamburger:active {
          transform: scale(0.95);
        }

        .hamburger:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .hamburger-line {
          width: 1.25rem;
          height: 2px;
          background: var(--text-primary);
          transition: all var(--transition-fast);
          border-radius: 1px;
          position: relative;
          z-index: 1;
        }

        .hamburger.active {
          border-color: var(--primary-color);
          background: var(--active-bg);
        }

        .hamburger.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 4rem;
          left: 0;
          width: 100%;
          height: calc(100vh - 4rem);
          background: var(--background-color);
          z-index: 999;
          padding: 2rem;
          overflow-y: auto;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-link {
          padding: 1rem;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
          background: var(--surface-elevated);
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }

        .mobile-nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity var(--transition-fast);
          border-radius: var(--radius-lg);
        }

        .mobile-nav-link:hover {
          color: var(--text-inverse);
        }

        .mobile-nav-link:hover::before {
          opacity: 1;
        }

        .mobile-nav-link:active {
          transform: scale(0.98);
        }

        .mobile-nav-link.active {
          background: var(--active-bg);
          border-color: var(--active-border);
          color: var(--primary-color);
          font-weight: 600;
        }

        .mobile-nav-link.active::before {
          opacity: 0;
        }

        .mobile-nav-link.active:hover {
          color: var(--text-inverse);
        }

        .mobile-nav-link.active:hover::before {
          opacity: 1;
        }

        .mobile-nav-link span {
          position: relative;
          z-index: 1;
        }

        .mobile-auth {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-auth .btn {
          width: 100%;
          justify-content: center;
          padding: 1rem;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .nav-actions .btn {
            display: none;
          }

          .nav-actions .user-info {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .brand-text {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu.open {
            display: block;
          }
        }

        .btn-primary:active {
          animation: pulse 0.6s;
        }

        .nav-link:focus,
        .btn:focus,
        .theme-toggle:focus,
        .hamburger:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>

      <header className="header">
        <div className="header-container">
          <NavLinkWithLoading to="/" className="brand">
            <div className="logo">
              <img src="/image/my-logo.png" alt="TokenPlatform logo" />
            </div>
            <span className="brand-text">TokenPlatform</span>
          </NavLinkWithLoading>
          
          <nav className="desktop-nav">
            <NavLinkWithLoading 
              to="/marketplace" 
              className={`nav-link ${isActiveRoute('/marketplace') ? 'active' : ''}`}
            >
              Marketplace
            </NavLinkWithLoading>
            {user ? (
              <>
                <NavLinkWithLoading 
                  to="/tokens" 
                  className={`nav-link ${isActiveRoute('/tokens') ? 'active' : ''}`}
                >
                  Tokens
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/projects" 
                  className={`nav-link ${isActiveRoute('/projects') ? 'active' : ''}`}
                >
                  Projects
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to={userIsAdmin ? "/admin" : "/dashboard"} 
                  className={`nav-link ${isActiveRoute('/dashboard') || isActiveRoute('/admin') ? 'active' : ''}`}
                >
                  {userIsAdmin ? "Admin Panel" : "Dashboard"}
                  {userIsAdmin && <span className="admin-badge">ADMIN</span>}
                </NavLinkWithLoading>
              </>
            ) : (
              <>
                <NavLinkWithLoading 
                  to="/about" 
                  className={`nav-link ${isActiveRoute('/about') ? 'active' : ''}`}
                >
                  About
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/features" 
                  className={`nav-link ${isActiveRoute('/features') ? 'active' : ''}`}
                >
                  Features
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/contact" 
                  className={`nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
                >
                  Contact
                </NavLinkWithLoading>
              </>
            )}
          </nav>

          <div className="nav-actions">
            {/* <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              disabled={loadingStates.themeToggle}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {loadingStates.themeToggle ? (
                  <InlineSpinner size="sm" color="blue" />
                ) : (
                  isDarkMode ? "☀️" : "🌙"
                )}
              </span>
            </button> */}

            {user ? (
              <>
                <div className="user-info">
                  Welcome,&nbsp;
                  {user.first_name ||
                    user.username ||
                    user.email ||
                    (user.wallet_address
                      ? user.wallet_address.slice(0, 6) + "..." + user.wallet_address.slice(-4)
                      : "User")}
                  {userIsAdmin && <span className="admin-badge">ADMIN</span>}
                </div>

                <NavLinkWithLoading
                  to="/profile"
                  className={`btn btn-outline ${
                    isActiveRoute("/profile") ? "active" : ""
                  }`}
                >
                  Profile
                </NavLinkWithLoading>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger"
                  disabled={loadingStates.logout}
                >
                  {loadingStates.logout && <InlineSpinner size="sm" color="white" />}
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLinkWithLoading
                  to="/login"
                  className={`btn btn-outline ${
                    isActiveRoute("/login") ? "active" : ""
                  }`}
                >
                  Login
                </NavLinkWithLoading>
                <NavLinkWithLoading
                  to="/register"
                  className={`btn btn-primary ${
                    isActiveRoute("/register") ? "active" : ""
                  }`}
                >
                  Get Started
                </NavLinkWithLoading>
              </>
            )}

            <button
              className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              disabled={loadingStates.mobileMenu}
            >
              {loadingStates.mobileMenu ? (
                <InlineSpinner size="sm" color="blue" />
              ) : (
                <>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <NavLinkWithLoading 
              to="/marketplace" 
              className={`mobile-nav-link ${isActiveRoute('/marketplace') ? 'active' : ''}`}
            >
              Marketplace
            </NavLinkWithLoading>
            {user ? (
              <>
                <NavLinkWithLoading 
                  to="/tokens" 
                  className={`mobile-nav-link ${isActiveRoute('/tokens') ? 'active' : ''}`}
                >
                  Tokens
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/projects" 
                  className={`mobile-nav-link ${isActiveRoute('/projects') ? 'active' : ''}`}
                >
                  Projects
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to={userIsAdmin ? "/admin" : "/dashboard"} 
                  className={`mobile-nav-link ${isActiveRoute('/dashboard') || isActiveRoute('/admin') ? 'active' : ''}`}
                >
                  {userIsAdmin ? "Admin Panel" : "Dashboard"}
                  {userIsAdmin && <span className="admin-badge">ADMIN</span>}
                </NavLinkWithLoading>
              </>
            ) : (
              <>
                <NavLinkWithLoading 
                  to="/about" 
                  className={`mobile-nav-link ${isActiveRoute('/about') ? 'active' : ''}`}
                >
                  About
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/features" 
                  className={`mobile-nav-link ${isActiveRoute('/features') ? 'active' : ''}`}
                >
                  Features
                </NavLinkWithLoading>
                <NavLinkWithLoading 
                  to="/contact" 
                  className={`mobile-nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
                >
                  Contact
                </NavLinkWithLoading>
              </>
            )}
          </nav>

          <div className="mobile-auth">
            {user ? (
              <>
                <NavLinkWithLoading
                  to="/profile"
                  className={`btn btn-outline ${
                    isActiveRoute("/profile") ? "active" : ""
                  }`}
                >
                  Profile
                </NavLinkWithLoading>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger"
                  disabled={loadingStates.logout}
                >
                  {loadingStates.logout && <InlineSpinner size="sm" color="white" />}
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLinkWithLoading
                  to="/login"
                  className={`btn btn-outline ${
                    isActiveRoute("/login") ? "active" : ""
                  }`}
                >
                  Login
                </NavLinkWithLoading>
                <NavLinkWithLoading
                  to="/register"
                  className={`btn btn-primary ${
                    isActiveRoute("/register") ? "active" : ""
                  }`}
                >
                  Get Started
                </NavLinkWithLoading>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
