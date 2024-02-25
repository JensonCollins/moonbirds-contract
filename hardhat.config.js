require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.public.blastapi.io",
      }
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 15,
    enabled: true,
  },
};
