require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1 || "";
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "";
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
/*const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";*/
const REPORT_GAS = true;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "rinkeby",

  networks: {
    /*hardhat: {
      forking: {
        url: POLYGON_RPC_URL,
        blockNumber: 29495364,
      },
      //accounts: [PRIVATE_KEY],
      chainId: 137,
      blockConfirmation: 1,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    polygon: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137,
      blockConfirmation: 6,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmation: 6,
    },*/
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      chainId: 4,
      blockConfirmation: 6,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.6.0",
      },
      {
        version: "0.8.0",
      },
    ],
  },

  /*gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },*/

  namedAccounts: {
    deployer: {
      default: 0,
    },
    caller: {
      default: 1,
    },
  },
};
