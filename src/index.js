// // tokenization-frontend/src/index.js

// import React from 'react';
// import ReactDOM from 'react-dom/client';

// // Import CSS files in the correct order
// // import './styles/professional-theme.css';  // Design tokens first
// import './styles/globals.css';      // Global styles second
// import './styles/Components.css';   // Component styles third
// import './styles/Home.css';         // Page-specific styles last
// import './index.css';               // Your existing index.css
// export { default as TokenManagement } from './components/tokens/TokenManagement';
// export { default as TokenList } from './components/tokens/TokenList';
// export { default as TokenCard } from './components/tokens/TokenCard';
// export { default as TokenDetails } from './components/tokens/TokenDetails';
// export { default as TokenCreator } from './components/tokens/TokenCreator';
// export { default as PurchaseModal } from './components/tokens/PurchaseModal';
// export { default as PortfolioOverview } from './components/tokens/PortfolioOverview';
// import { Web3Provider } from './contexts/Web3Context';

// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      <Web3Provider> 
//     <App />
//      </Web3Provider> 
//   </React.StrictMode>
// );

// tokenization-frontend/src/index.js

// ALL IMPORTS FIRST
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import CSS files in the correct order
// import './styles/professional-theme.css';  // Design tokens first
import './styles/globals.css';      // Global styles second
import './styles/Components.css';   // Component styles third
import './styles/Home.css';         // Page-specific styles last
import './index.css';               // Your existing index.css

// Import components and contexts
import { Web3Provider } from './contexts/Web3Context';
import App from './App';

// EXPORTS AFTER ALL IMPORTS
// Components (named exports)
export { default as TokenManagement } from './components/tokens/TokenManagement';
export { default as TokenList } from './components/tokens/TokenList';
export { default as TokenCard } from './components/tokens/TokenCard';
export { default as TokenDetails } from './components/tokens/TokenDetails';
export { default as TokenCreator } from './components/tokens/TokenCreator';
export { default as PurchaseModal } from './components/tokens/PurchaseModal';
export { default as PortfolioOverview } from './components/tokens/PortfolioOverview';

// MAIN EXECUTION CODE LAST
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Web3Provider>
//       <App />
//     </Web3Provider>
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Web3Provider> 
    <App />
     </Web3Provider> 
  </React.StrictMode>
);
