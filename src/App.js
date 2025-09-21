

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProtectedLayout from './components/auth/ProtectedLayout';
import Header from './components/common/Header'; // Import Header component
import Footer from './components/common/Footer'; // Import Footer component
import ProfessionalHomepage from './pages/ProfessionalHomepage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MarketplacePage from './pages/MarketplacePage';
import Register from './pages/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import { TokenManagement } from './components/tokens';
import TokenCreatorComponent from './components/tokens/TokenCreator';
import FeaturesPage from './pages/FeaturesPage';
import PageNotFound from './components/common/PageNotFound';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';  
import Projects from './components/projects/ProjectCreator';
// import LoginEmailPage from "./components/auth/LoginEmailPage";
import { Web3Provider } from "./contexts/Web3Context";  


// Layout component with Header and Footer on all pages
function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: 'var(--background-color)', 
      color: 'var(--text-primary)',
      transition: 'all 150ms ease'
    }}>
      <Header />
      <main className="flex-1 pt" style={{ 
        backgroundColor: 'var(--surface-color)', 
        transition: 'all 150ms ease'
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
     <Web3Provider> 
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<ProfessionalHomepage />} />
            <Route path="/home" element={<ProfessionalHomepage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/login-email" element={<LoginEmailPage />} /> */}

            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              }
            />
            <Route path="/admin" element={ <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
            
            {/* Token routes */}
            <Route
              path="/tokens"
              element={
                <ProtectedRoute>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Tokens Page</h1>
                    <TokenManagement />
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/tokens/create-token"
              element={
                <ProtectedRoute>
                  <TokenCreatorComponent />
                </ProtectedRoute>
              }
            />
            
            {/* Keep the old route for backward compatibility */}
            <Route path="/create-token" element={<Navigate to="/tokens/create-token" replace />} />
            
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <MarketplacePage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Transactions Page</h1>
                    <p>Your transaction history goes here</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p>User administration interface goes here</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            {/* 404 fallback - redirect to 404 page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
     </Web3Provider> 
  );
}

export default App;


// // src/App.js  (ProtectedRoute → ProtectedLayout)

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedLayout from './components/auth/ProtectedLayout'; // ✅ new
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
// import ProfessionalHomepage from './pages/ProfessionalHomepage';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import MarketplacePage from './pages/MarketplacePage';
// import Register from './pages/Register';
// import AdminDashboard from './components/admin/AdminDashboard';
// import { TokenManagement } from './components/tokens';
// import TokenCreatorComponent from './components/tokens/TokenCreator';
// import FeaturesPage from './pages/FeaturesPage';
// import PageNotFound from './components/common/PageNotFound';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';  

// // Layout with Header/Footer
// function AppLayout({ children }) {
//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)', transition: 'all 150ms ease' }}>
//       <Header />
//       <main className="flex-1 pt" style={{ backgroundColor: 'var(--surface-color)', transition: 'all 150ms ease' }}>
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppLayout>
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<ProfessionalHomepage />} />
//             <Route path="/home" element={<ProfessionalHomepage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/features" element={<FeaturesPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/contact" element={<ContactPage />} />

//             {/* Protected routes (ProtectedRoute → ProtectedLayout) */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedLayout>
//                   <Dashboard />
//                 </ProtectedLayout>
//               }
//             />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedLayout>
//                   <AdminDashboard />
//                 </ProtectedLayout>
//               }
//             />

//             {/* Token routes */}
//             <Route
//               path="/tokens"
//               element={
//                 <ProtectedLayout>
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Tokens Page</h1>
//                     <TokenManagement />
//                   </div>
//                 </ProtectedLayout>
//               }
//             />
//             <Route
//               path="/tokens/create-token"
//               element={
//                 <ProtectedLayout>
//                   <TokenCreatorComponent />
//                 </ProtectedLayout>
//               }
//             />

//             {/* Legacy redirect */}
//             <Route path="/create-token" element={<Navigate to="/tokens/create-token" replace />} />

//             <Route
//               path="/marketplace"
//               element={
//                 <ProtectedLayout>
//                   <MarketplacePage />
//                 </ProtectedLayout>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedLayout>
//                   <Profile />
//                 </ProtectedLayout>
//               }
//             />
//             <Route
//               path="/transactions"
//               element={
//                 <ProtectedLayout>
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Transactions Page</h1>
//                     <p>Your transaction history goes here</p>
//                   </div>
//                 </ProtectedLayout>
//               }
//             />
//             <Route
//               path="/users"
//               element={
//                 <ProtectedLayout>
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">User Management</h1>
//                     <p>User administration interface goes here</p>
//                   </div>
//                 </ProtectedLayout>
//               }
//             />

//            {/* ✅ 404 page instead of redirect */}
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </AppLayout>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;