// ============ Contracts ============

const EthForwarder = artifacts.require("EthForwarder");

// ============ Main Migration ============

const migration = async (deployer, network) => {
  await Promise.all([deployContract(deployer, network)]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployContract(deployer) {
  await deployer.deploy(EthForwarder);
}
