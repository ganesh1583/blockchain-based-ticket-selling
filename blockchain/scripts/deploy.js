async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
  
    // Deploy the contract
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
  
    console.log("Contract deployed to address:", await myNFT.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  


    // 0x5FbDB2315678afecb367f032d93F642f64180aa3