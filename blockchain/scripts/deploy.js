const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Get the first local account
  
  console.log("Deploying contract with address:", deployer.address);

  // Compile & deploy the contract
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();

  console.log("Contract deployed at:", await myNFT.getAddress());
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

  // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266