require("@nomicfoundation/hardhat-toolbox");

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
        url: "https://eth.llamarpc.com",
      }
    }
  }
};
