# keeper-payment-contract

This is a supporting repository for the [Keeper project](https://github.com/chronologic/keeper-service).
\
🗞 https://twitter.com/keep_project/status/1389704394833219585

## Repository overview

Normally, ETH transfers don't generate events you could search for or listen to, which is a problem if you want to monitor an address for incoming transfers. This repository holds the smart contract that proxies ETH payments for the Keeper service and generates appropriate events. The repository is also meant to be used as a dependency in other repositories.

## Environment variables

This repo uses [`dotenv`](https://www.npmjs.com/package/dotenv) to load environment variables.

For development, and `.env` file should be created based on the `.env.example` template file. The `.env` file should never be commited.

In production, environment variables can be injected directly.

Below is a list of possible environment variables.

| Name                   | Type     | Default | Description                                                                                    |
| ---------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| `DEPLOYER_ADDRESS`     | `string` |         | Address of the deployer                                                                        |
| `DEPLOYER_PRIVATE_KEY` | `string` |         | Private key of the deployer                                                                    |
| `ETHERSCAN_API_KEY`    | `string` |         | API key for Etherscan to automatically deploy contract source code via `truffle-plugin-verify` |
| `MAINNET_RPC_URL`      | `string` |         | RPC URL for mainnet (.e.g from [Infura](https://infura.io/))                                                         |
| `ROPSTEN_RPC_URL`      | `string` |         | RPC URL for ropsten (.e.g from [Infura](https://infura.io/))                                                         |

## Deployment

Run one of the following:

- `npm run deploy:dev`
- `npm run deploy:ropsten`
- `npm run deploy:mainnet`

To deploy to the desired network.

After deployment, you may also run:

- `npm run verify:ropsten`
- `npm run verify:mainnet`

To verify source code on Etherscan.

## Creating a release

Run `npm run build-release`. This will compile the source code and switch to `release` branch. The compiled code can then be commited and tagged, e.g. `v1.0.1`.

## Development

Run `npm run ganache:dev` to start a local ganache instance.
Then you can do `npm run deploy:dev` to deploy to that instance to interact with the contract.

## Testing

Tests are located in `/test` directory.
Run `npm run ganache:test` to start a local ganache instance for testing. Then run `npm run test` to execute the test suite.
