
import hre from "hardhat";

async function main() {
  console.log("Deploying MyDatasetNFT contract...");
  const myDatasetNFT = await hre.ethers.deployContract("MyDatasetNFT");

  await myDatasetNFT.waitForDeployment();

  const contractAddress = await myDatasetNFT.getAddress();
  console.log("✅ MyDatasetNFT contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});