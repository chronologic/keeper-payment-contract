const { BigNumber } = require("ethers");

const EthForwarder = artifacts.require("EthForwarder");
const EVMHelper = require("./helpers/Evm");

contract("EthForwarder", (accounts) => {
  let instance;
  let evmHelper;
  before(async () => {
    instance = await EthForwarder.new();
    evmHelper = new EVMHelper(web3.currentProvider);
  });

  it("forwards payments", async () => {
    const beneficiaryAddress = accounts[0];
    const senderAddress = accounts[1];
    const amountToSend = web3.utils.toWei("3", "ether");
    const beficiaryBalanceBefore = await web3.eth.getBalance(beneficiaryAddress);

    await instance.contract.methods.pay().send({ from: senderAddress, value: amountToSend });

    const beficiaryBalanceAfter = await web3.eth.getBalance(beneficiaryAddress);
    const beneficiaryBalanceDiff = BigNumber.from(beficiaryBalanceAfter).sub(beficiaryBalanceBefore).toString();

    expect(beneficiaryBalanceDiff).to.equal(amountToSend);
  });

  it("emits events", async () => {
    const beneficiaryAddress = accounts[0];
    const senderAddress = accounts[1];
    const amountToSend = web3.utils.toWei("3", "ether");

    const res = await instance.contract.methods
      .pay()
      .send({ from: senderAddress, to: beneficiaryAddress, value: amountToSend });

    const forwardedEvent = res.events.Forwarded;

    expect(forwardedEvent.returnValues._from).to.equal(senderAddress);
    expect(forwardedEvent.returnValues._to).to.equal(beneficiaryAddress);
    expect(forwardedEvent.returnValues._amount).to.equal(amountToSend);
  });

  it("allows owner to change destination address", async () => {
    const ownerAddress = accounts[0];
    const newDestinationAddress = accounts[2];

    let thrown = false;
    try {
      await instance.contract.methods.setDestinationAddress(newDestinationAddress).send({ from: ownerAddress });
    } catch (e) {
      thrown = true;
    }
    expect(thrown).to.equal(false);
  });

  it("does not allow non-owner to change destination address", async () => {
    const notOwnerAddress = accounts[1];
    const newDestinationAddress = accounts[2];

    let thrown = false;
    try {
      await instance.contract.methods.setDestinationAddress(newDestinationAddress).send({ from: notOwnerAddress });
    } catch (e) {
      thrown = true;
    }
    expect(thrown).to.equal(true);
  });
});
