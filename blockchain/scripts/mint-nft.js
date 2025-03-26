const hre = require("hardhat");
const path = require("path");

// Manually load Hardhat config
process.chdir(path.resolve(__dirname, ".."));  // Change to Hardhat project root

async function mintNFT(recipient, metadataURI) {
  await hre.run("compile");  // Ensure contracts are compiled

  const [minter] = await hre.ethers.getSigners();
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
  const contractABI = require("../artifacts/contracts/MyNft.sol/MyNFT.json").abi;

  const nftContract = new hre.ethers.Contract(contractAddress, contractABI, minter);

  console.log(`Minting NFT for: ${recipient} with metadata: ${metadataURI}`);

  const txn = await nftContract.mintNFT(recipient, metadataURI);
  await txn.wait();

  console.log("NFT Minted! Transaction Hash:", txn.hash);
  return txn.hash;
}

module.exports = { mintNFT };
