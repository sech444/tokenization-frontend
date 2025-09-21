import AssetTokenizerABI from "../abis/AssetTokenizer.json";
import TokenFactoryABI from "../abis/TokenFactory.json";
import MarketplaceCoreABI from "../abis/MarketplaceCore.json";
import RewardSystemABI from "../abis/RewardSystem.json";

// ✅ Change to mainnet addresses when deploying live
export const CONTRACT_ADDRESSES = {
  amoy: {
    assetTokenizer: "0x84764BFcC38A8DaC5faA0F6DB9AC7A907ad05A16",
    tokenFactory: "0xaC86b4C50d1aebc4870c1e666A9589F7c68eC669",
    marketplaceCore: "0xF3D4e6134edeB4a26349613Cf1daD03ABFfB1fb8",
    rewardSystem: "0xFD2027b8caA02ed738010fBd9121DE00d70B8666"
  },
  // mainnet: {
  //   assetTokenizer: "0x...",
  //   tokenFactory: "0x...",
  //   marketplaceCore: "0x...",
  //   rewardSystem: "0x..."
  // }
};

export const CONTRACT_ABIS = {
  assetTokenizer: AssetTokenizerABI,
  tokenFactory: TokenFactoryABI,
  marketplaceCore: MarketplaceCoreABI,
  rewardSystem: RewardSystemABI
};

// ✅ Helper to get ABI + Address for a given contract
export function getContractConfig(contractName, chain = "amoy") {
  const address = CONTRACT_ADDRESSES[chain]?.[contractName];
  const abi = CONTRACT_ABIS[contractName];
  if (!address || !abi) {
    throw new Error(`Missing config for contract: ${contractName} on ${chain}`);
  }
  return { address, abi };
}
