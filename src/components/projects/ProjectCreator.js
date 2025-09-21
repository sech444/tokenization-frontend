

// // src/components/projects/ProjectCreator.js
// import React, { useState } from "react";
// import { createProject, tokenizationAPI } from "../../services/api";
// import { useWalletAuth } from "../../contexts/Web3Context";
// import WalletConnectButton from "../WalletConnectButton";

// const ProjectCreator = () => {
//   const { account, isAuthenticated } = useWalletAuth(); // ✅ wallet state
//   const [projectData, setProjectData] = useState({
//     name: "",
//     description: "",
//     project_type: "",
//     location: "",
//     investment_amount: 0,
//     expected_return: 0,
//     duration_months: 12,
//     risk_level: "medium",
//     minimum_investment: 1000,
//     property_id: "",
//     deed_document: null,
//     token_name: "",
//     token_symbol: "",
//     metadata_uri: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [tokenizationResult, setTokenizationResult] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!account) {
//       return setError("Please connect your wallet first");
//     }
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       if (!projectData.name || !projectData.description || !projectData.property_id) {
//         throw new Error("Project name, description, and property ID are required");
//       }
//       if (!projectData.token_name || !projectData.token_symbol) {
//         throw new Error("Token name and symbol are required");
//       }

//       // 1. Map frontend → backend schema
//       const backendData = {
//         ...projectData,
//         wallet_address: account,
//         total_value: Math.round(projectData.investment_amount * 100),
//         minimum_investment: Math.round(projectData.minimum_investment * 100),
//       };

//       // 2. Create project in DB
//       const created = await createProject(backendData);

//       // 3. Tokenize as ERC721 Deed NFT
//       const tokenizationData = {
//         token_name: projectData.token_name,
//         token_symbol: projectData.token_symbol.toUpperCase(),
//         total_supply: 1,
//         decimals: 0,
//         metadata_uri: projectData.metadata_uri || `ipfs://metadata/${created.id}`,
//       };

//       const tokenized = await tokenizationAPI.tokenizeProject(created.id, tokenizationData);

//       setTokenizationResult(tokenized);
//       setSuccess(true);

//       setProjectData({
//         name: "",
//         description: "",
//         project_type: "",
//         location: "",
//         investment_amount: 0,
//         expected_return: 0,
//         duration_months: 12,
//         risk_level: "medium",
//         minimum_investment: 1000,
//         property_id: "",
//         deed_document: null,
//         token_name: "",
//         token_symbol: "",
//         metadata_uri: "",
//       });
//     } catch (err) {
//       setError(err.message || "Failed to create and tokenize project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setProjectData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : type === "number" ? parseFloat(value) || 0 : value,
//     }));
//   };

//   return (
//     <div className="container">
//       <div className="flex justify-center p-6">
//         <div className="w-full max-w-2xl">
//           {!isAuthenticated ? (
//             <div className="text-center p-6 border rounded bg-yellow-50">
//               <p className="mb-4 font-medium text-yellow-700">
//                 Please connect your wallet to create a project
//               </p>
//               {/* ✅ Use shared WalletConnectButton */}
//               <WalletConnectButton variant="primary" />
//             </div>
//           ) : (
//             <div className="card animate-slideUp">
//               <div className="card-body">
//                 {error && <div className="alert alert-error mb-6">{error}</div>}
//                 {success && (
//                   <div className="alert alert-success mb-6">
//                     ✅ Project created & tokenized successfully!
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Project Info */}
//                   <div className="bg-surface p-5 rounded-lg border">
//                     <h3 className="text-lg font-semibold mb-4">Real Estate Project</h3>
//                     <input type="text" name="name" placeholder="Project Name" value={projectData.name} onChange={handleChange} className="form-input" required />
//                     <textarea name="description" placeholder="Description" value={projectData.description} onChange={handleChange} className="form-textarea" required />
//                     <input type="text" name="location" placeholder="Location" value={projectData.location} onChange={handleChange} className="form-input" required />
//                     <input type="text" name="property_id" placeholder="Property ID / Deed Number" value={projectData.property_id} onChange={handleChange} className="form-input" required />
//                     <input type="file" name="deed_document" onChange={handleChange} className="form-input" />
//                   </div>

//                   {/* ERC721 Tokenization */}
//                   <div className="bg-surface p-5 rounded-lg border">
//                     <h3 className="text-lg font-semibold mb-4">ERC721 Deed NFT</h3>
//                     <input type="text" name="token_name" placeholder="Token Name" value={projectData.token_name} onChange={handleChange} className="form-input" required />
//                     <input type="text" name="token_symbol" placeholder="Token Symbol" value={projectData.token_symbol} onChange={handleChange} className="form-input" required />
//                     <input type="text" name="metadata_uri" placeholder="Metadata URI (ipfs://...)" value={projectData.metadata_uri} onChange={handleChange} className="form-input" />
//                   </div>

//                   {/* Financials */}
//                   <div className="bg-surface p-5 rounded-lg border">
//                     <input type="number" name="investment_amount" placeholder="Total Investment ($)" value={projectData.investment_amount} onChange={handleChange} className="form-input" required />
//                     <input type="number" name="minimum_investment" placeholder="Minimum Investment ($)" value={projectData.minimum_investment} onChange={handleChange} className="form-input" required />
//                     <input type="number" name="expected_return" placeholder="Expected Return (%)" value={projectData.expected_return} onChange={handleChange} className="form-input" />
//                     <input type="number" name="duration_months" placeholder="Duration (months)" value={projectData.duration_months} onChange={handleChange} className="form-input" />
//                   </div>

//                   <button type="submit" disabled={loading} className="btn btn-primary w-full">
//                     {loading ? "Processing..." : "Create & Tokenize Project"}
//                   </button>
//                 </form>

//                 {tokenizationResult && (
//                   <div className="mt-6 p-4 border rounded bg-green-50">
//                     <h4 className="font-semibold text-green-700 mb-2">Deed NFT Created</h4>
//                     <p><b>Token Address:</b> {tokenizationResult.token_address}</p>
//                     <p><b>Tx Hash:</b> {tokenizationResult.transaction_hash}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCreator;


// 📘 ProjectCreator.js
// Purpose: Allow authenticated wallet users to create a Real Estate project 
// and tokenize it as an ERC721 Deed NFT.

// Handles:
//  - @WalletAuth: Ensures wallet is connected before creating a project
//  - @ProjectForm: Collects project and financial info from the user
//  - @BackendSync: Submits project data to backend API
//  - @Tokenization: Mints an ERC721 NFT deed via tokenization API
//  - @Feedback: Provides success/failure messages and on-chain transaction details

import React, { useState } from "react";
import { createProject, tokenizationAPI } from "../../services/api";
import { useWalletAuth } from "../../contexts/Web3Context";
import WalletConnectButton from "../WalletConnectButton";

const ProjectCreator = () => {
  // @WalletAuth
  const { account, isAuthenticated } = useWalletAuth();

  // @ProjectForm
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    project_type: "",
    location: "",
    investment_amount: 0,
    expected_return: 0,
    duration_months: 12,
    risk_level: "medium",
    minimum_investment: 1000,
    property_id: "",
    deed_document: null,
    token_name: "",
    token_symbol: "",
    metadata_uri: "",
  });

  // @Feedback state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tokenizationResult, setTokenizationResult] = useState(null);

  // @BackendSync + @Tokenization
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      return setError("Please connect your wallet first");
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!projectData.name || !projectData.description || !projectData.property_id) {
        throw new Error("Project name, description, and property ID are required");
      }
      if (!projectData.token_name || !projectData.token_symbol) {
        throw new Error("Token name and symbol are required");
      }

      // (1) Map frontend → backend schema
      const backendData = {
        ...projectData,
        wallet_address: account,
        total_value: Math.round(projectData.investment_amount * 100), // cents
        minimum_investment: Math.round(projectData.minimum_investment * 100),
      };

      // (2) Create project in DB
      const created = await createProject(backendData);

      // (3) Tokenize as ERC721 Deed NFT
      const tokenizationData = {
        token_name: projectData.token_name,
        token_symbol: projectData.token_symbol.toUpperCase(),
        total_supply: 1,
        decimals: 0,
        metadata_uri: projectData.metadata_uri || `ipfs://metadata/${created.id}`,
      };

      const tokenized = await tokenizationAPI.tokenizeProject(created.id, tokenizationData);

      // ✅ On success
      setTokenizationResult(tokenized);
      setSuccess(true);

      // Reset form
      setProjectData({
        name: "",
        description: "",
        project_type: "",
        location: "",
        investment_amount: 0,
        expected_return: 0,
        duration_months: 12,
        risk_level: "medium",
        minimum_investment: 1000,
        property_id: "",
        deed_document: null,
        token_name: "",
        token_symbol: "",
        metadata_uri: "",
      });
    } catch (err) {
      setError(err.message || "Failed to create and tokenize project");
    } finally {
      setLoading(false);
    }
  };

  // @ProjectForm input handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="container">
      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* @WalletAuth */}
          {!isAuthenticated ? (
            <div className="text-center p-6 border rounded bg-yellow-50">
              <p className="mb-4 font-medium text-yellow-700">
                Please connect your wallet to create a project
              </p>
              <WalletConnectButton variant="primary" />
            </div>
          ) : (
            <div className="card animate-slideUp">
              <div className="card-body">
                {/* @Feedback */}
                {error && <div className="alert alert-error mb-6">{error}</div>}
                {success && (
                  <div className="alert alert-success mb-6">
                    ✅ Project created & tokenized successfully!
                  </div>
                )}

                {/* @ProjectForm */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Info */}
                  <div className="bg-surface p-5 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">🏗 Real Estate Project</h3>
                    <input type="text" name="name" placeholder="Project Name" value={projectData.name} onChange={handleChange} className="form-input" required />
                    <textarea name="description" placeholder="Description" value={projectData.description} onChange={handleChange} className="form-textarea" required />
                    <input type="text" name="location" placeholder="Location" value={projectData.location} onChange={handleChange} className="form-input" required />
                    <input type="text" name="property_id" placeholder="Property ID / Deed Number" value={projectData.property_id} onChange={handleChange} className="form-input" required />
                    <input type="file" name="deed_document" onChange={handleChange} className="form-input" />
                  </div>

                  {/* ERC721 Tokenization */}
                  <div className="bg-surface p-5 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">🪙 ERC721 Deed NFT</h3>
                    <input type="text" name="token_name" placeholder="Token Name" value={projectData.token_name} onChange={handleChange} className="form-input" required />
                    <input type="text" name="token_symbol" placeholder="Token Symbol" value={projectData.token_symbol} onChange={handleChange} className="form-input" required />
                    <input type="text" name="metadata_uri" placeholder="Metadata URI (ipfs://...)" value={projectData.metadata_uri} onChange={handleChange} className="form-input" />
                  </div>

                  {/* Financials */}
                  <div className="bg-surface p-5 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">💰 Financials</h3>
                    <input type="number" name="investment_amount" placeholder="Total Investment ($)" value={projectData.investment_amount} onChange={handleChange} className="form-input" required />
                    <input type="number" name="minimum_investment" placeholder="Minimum Investment ($)" value={projectData.minimum_investment} onChange={handleChange} className="form-input" required />
                    <input type="number" name="expected_return" placeholder="Expected Return (%)" value={projectData.expected_return} onChange={handleChange} className="form-input" />
                    <input type="number" name="duration_months" placeholder="Duration (months)" value={projectData.duration_months} onChange={handleChange} className="form-input" />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? "⏳ Processing..." : "🚀 Create & Tokenize Project"}
                  </button>
                </form>

                {/* @Feedback: Tokenization Results */}
                {tokenizationResult && (
                  <div className="mt-6 p-4 border rounded bg-green-50">
                    <h4 className="font-semibold text-green-700 mb-2">✅ Deed NFT Created</h4>
                    <p><b>Token Address:</b> {tokenizationResult.token_address}</p>
                    <p><b>Tx Hash:</b> {tokenizationResult.transaction_hash}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCreator;

