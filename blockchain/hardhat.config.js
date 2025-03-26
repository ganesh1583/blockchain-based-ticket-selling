require("@nomicfoundation/hardhat-toolbox");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
// require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337, // Optional: You can specify a custom chain ID for Hardhat network
    },
    // sepolia: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
  },
};
