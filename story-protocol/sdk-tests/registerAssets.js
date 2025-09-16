import { createWalletClient, http, publicActions, decodeEventLog } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import "dotenv/config";

const MY_NFT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "string", name: "uri", type: "string" },
    ],
    name: "mintNFT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

const IP_ASSET_REGISTRY_ABI = [
  {
    inputs: [
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "registerIp",
    outputs: [{ internalType: "uint256", name: "ipId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const IP_ASSET_REGISTRY_CONTRACT = "0x160b241f4902092ce4a4210616a2c442daa3a2cf";

function getEnvVar(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set in the .env file`);
  return value;
}

async function mintAndRegister() {
  const rpcUrl = getEnvVar("RPC_PROVIDER_URL");
  const privateKey = getEnvVar("PRIVATE_KEY");
  const nftContractAddress = getEnvVar("NFT_CONTRACT_ADDRESS");
  
  const account = privateKeyToAccount(privateKey);
  
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(rpcUrl),
  }).extend(publicActions);

  console.log("Using account:", account.address);
  console.log("Using NFT Contract:", nftContractAddress);

  console.log("Minting NFT on your contract...");
  const { request: mintRequest } = await client.simulateContract({
    address: nftContractAddress,
    abi: MY_NFT_ABI,
    functionName: "mintNFT",
    args: [account.address, "ipfs://metadata"],
  });
  const mintTxHash = await client.writeContract(mintRequest);
  console.log("   Mint transaction sent, hash:", mintTxHash);
  const receipt = await client.waitForTransactionReceipt({ hash: mintTxHash });
  
  const transferLog = receipt.logs.find(log => {
      try {
          const decodedLog = decodeEventLog({ abi: MY_NFT_ABI, data: log.data, topics: log.topics });
          return decodedLog.eventName === 'Transfer';
      } catch { return false; }
  });

  if (!transferLog) { throw new Error("Transfer event not found in mint transaction logs."); }
  const decodedTransferLog = decodeEventLog({ abi: MY_NFT_ABI, data: transferLog.data, topics: transferLog.topics });
  const tokenIdToRegister = decodedTransferLog.args.tokenId;
  console.log(`   NFT (Token ID ${tokenIdToRegister}) minted successfully!`);

  /
  console.log("Approving Story Protocol...");
  const { request: approveRequest } = await client.simulateContract({
    address: nftContractAddress,
    abi: MY_NFT_ABI,
    functionName: "approve",
    args: [IP_ASSET_REGISTRY_CONTRACT, tokenIdToRegister],
  });
  const approveTxHash = await client.writeContract(approveRequest);
  console.log("   Approve transaction sent, hash:", approveTxHash);
  await client.waitForTransactionReceipt({ hash: approveTxHash });
  console.log("   Approval successful!");

  console.log("Registering IP with Story Protocol (Direct Send)...");
  const registerTxHash = await client.writeContract({
    address: IP_ASSET_REGISTRY_CONTRACT,
    abi: IP_ASSET_REGISTRY_ABI,
    functionName: "registerIp",
    args: [nftContractAddress, tokenIdToRegister],
    account,
  });
  console.log("   Register transaction sent, hash:", registerTxHash);
  await client.waitForTransactionReceipt({ hash: registerTxHash });

  console.log("CONGRATULATIONS! IP Asset registered successfully!");
}

mintAndRegister().catch((err) => {
  console.error("An error occurred:", err);
  process.exitCode = 1;
});