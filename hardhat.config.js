require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const REACT_APP_ALCHEMY_API_GOERLI_URL =
  process.env.REACT_APP_ALCHEMY_API_GOERLI_URL || "";
const REACT_APP_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 5777,
      accounts: [REACT_APP_PRIVATE_KEY],
    },
    goerli: {
      url: REACT_APP_ALCHEMY_API_GOERLI_URL,
      accounts: [REACT_APP_PRIVATE_KEY],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
