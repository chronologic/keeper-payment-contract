require("dotenv-flow").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
  compilers: {
    solc: {
      version: "0.7.6",
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 50000,
        },
        evmVersion: "istanbul",
      },
    },
  },
  networks: {
    mainnet: {
      network_id: "1",
      provider: () => new HDWalletProvider([process.env.DEPLOYER_PRIVATE_KEY], process.env.MAINNET_RPC_URL, 0, 1),
      gasPrice: 140000000000, // 140 gwei
      gas: 4000000,
      confirmations: 5,
      timeoutBlocks: 800,
      from: process.env.DEPLOYER_ACCOUNT,
    },
    ropsten: {
      provider: () => new HDWalletProvider([process.env.DEPLOYER_PRIVATE_KEY], process.env.ROPSTEN_RPC_URL, 0, 1),
      network_id: 3, // Ropsten's id
      gas: 8000000, // Ropsten has a lower block limit than mainnet
      confirmations: 1, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
      gasPrice: 9000000000,
      from: process.env.DEPLOYER_ADDRESS,
    },
    dev: {
      host: "localhost",
      port: 8545,
      network_id: "1005",
      gasPrice: 100000000000, // 100 gwei
      gas: 8000000,
    },
    test: {
      host: "localhost",
      port: 8546,
      network_id: "1006",
      gasPrice: 50000000000, // 50 gwei
      gas: 8000000,
    },
  },
};
