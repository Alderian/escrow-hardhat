const { ethers } = require('hardhat');
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const deposit = ethers.utils.parseEther('1');

describe('Escrow', function () {
  let contract, depositor, beneficiary, arbiter, addr1, addr2, addr3;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function prepareEsrow() {
    [depositor, beneficiary, arbiter, addr1, addr2, addr3] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(arbiter.getAddress(), beneficiary.getAddress(), {
      value: deposit,
    });
    await contract.deployed();

    return { contract, depositor, beneficiary, arbiter, addr1, addr2, addr3 };
  }

  before('Any test NFT Marketplace', async () => {
    ({ contract, depositor, beneficiary, arbiter, addr1, addr2, addr3 } = await loadFixture(
      prepareEsrow
    ));
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe('after approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());

      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();
      await expect(approveTxn).to.emit(contract, 'Approved').withArgs(deposit);

      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
