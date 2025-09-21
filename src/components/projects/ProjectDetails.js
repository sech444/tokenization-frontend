// // src/components/projects/ProjectDetails.js
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ProjectDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const project = location.state?.project; // ✅ full project passed from list/creator

//   if (!project) {
//     return <div className="p-6">❌ Project not found</div>;
//   }

//   const handleTokenize = () => {
//     // ✅ Pass project_id into TokenCreator via router state
//     navigate("/create-token", { state: { projectId: project.id } });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
//         <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
//         <p className="text-gray-600 dark:text-gray-400 mb-4">
//           📍 Location: {project.location}
//         </p>
//         <p className="text-gray-600 dark:text-gray-400 mb-4">
//           💰 Investment: ${project.investment_amount.toLocaleString()}
//         </p>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           📈 Expected Return: {project.expected_return}%
//         </p>

//         <button
//           onClick={handleTokenize}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
//             text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200"
//         >
//           🚀 Tokenize Project
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;

// src/components/projects/ProjectDetails.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWalletAuth } from "../../contexts/Web3Context";
import WalletConnectButton from "../WalletConnectButton";

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const { isAuthenticated } = useWalletAuth();

  if (!project) {
    return <div className="p-6">❌ Project not found</div>;
  }

  const handleTokenize = () => {
    navigate("/create-token", { state: { projectId: project.id } });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {project.description}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          📍 Location: {project.location}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          💰 Investment: ${project.investment_amount.toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          📈 Expected Return: {project.expected_return}%
        </p>

        {!isAuthenticated ? (
          <div className="p-4 border rounded bg-yellow-50 text-center">
            <p className="mb-3 text-yellow-700 font-medium">
              Please connect your wallet to tokenize this project
            </p>
            <WalletConnectButton variant="primary" />
          </div>
        ) : (
          <button
            onClick={handleTokenize}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
              text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200"
          >
            🚀 Tokenize Project
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

