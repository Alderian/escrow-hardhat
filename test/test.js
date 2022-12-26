const { ethers } = require('hardhat');
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Escrow', function () {
  let escrowManager, depositor, beneficiary, arbiter, addr1, addr2, addr3;

  // Array of all created escrows for latter assert
  let allEscrows = [];

  const deposit1Eth = ethers.utils.parseEther('1');
  const deposit2Eth = ethers.utils.parseEther('2');

  const getDeployedEscrowAddress = async (fromTransaction) => {
    const rc = await fromTransaction.wait(); // 0ms, as tx is already confirmed
    const event = rc.events.find((event) => event.event === 'Deployed');
    const [escrowContractAddress] = event.args;
    return escrowContractAddress;
  };

  const createEscrow = async (name, arbiterAddress, beneficiaryAddress, deposit) => {
    const createEscrowTxn = await escrowManager.createEscrow(
      name,
      arbiterAddress,
      beneficiaryAddress,
      {
        value: deposit,
      }
    );
    const escrowAddress = await getDeployedEscrowAddress(createEscrowTxn);
    allEscrows.push(escrowAddress);
    return {
      createEscrowTxn: createEscrowTxn,
      escrowAddress: escrowAddress,
    };
  };

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function prepareEsrow() {
    [depositor, beneficiary, arbiter, addr1, addr2, addr3] = await ethers.getSigners();

    const EscrowManager = await ethers.getContractFactory('EscrowManager');
    escrowManager = await EscrowManager.deploy();
    await escrowManager.deployed();

    return { escrowManager, depositor, beneficiary, arbiter, addr1, addr2, addr3 };
  }

  before('Any test Escrow', async () => {
    ({ escrowManager, depositor, beneficiary, arbiter, addr1, addr2, addr3 } = await loadFixture(
      prepareEsrow
    ));
  });

  describe('Test escrow manager', async () => {
    describe('Creates one escrow', async () => {
      it('should create an escrow and emit a Deploy signal', async () => {
        const { createEscrowTxn, escrowAddress } = await createEscrow(
          'My escrow',
          await arbiter.getAddress(),
          await beneficiary.getAddress(),
          deposit2Eth
        );

        await expect(createEscrowTxn)
          .to.emit(escrowManager, 'Deployed')
          .withArgs(
            escrowAddress,
            'My escrow',
            await arbiter.getAddress(),
            await beneficiary.getAddress(),
            await depositor.getAddress(),
            deposit2Eth
          );
      });
    });

    describe('Pagination', async () => {
      before('Create a lot of escrows', async () => {
        // Create a lot of escrows
        for (let i = 0; i < 10; i++) {
          const { createEscrowTxn, escrowAddress } = await createEscrow(
            'My escrow ' + i,
            await arbiter.getAddress(),
            await beneficiary.getAddress(),
            deposit1Eth
          );
        }
      });

      it('should find first page with first 5 escrows', async () => {
        // get page 1 with 5 items
        let escrows = await escrowManager.getEscrows(1, 5);
        expect(escrows.length).to.eq(5);
        for (let i = 0; i < 5; i++) {
          expect(escrows[i]).to.eq(allEscrows[i]);
        }
      });

      it('should find second page with second 5 escrows', async () => {
        // get page 1 with 5 items
        let escrows = await escrowManager.getEscrows(2, 5);
        expect(escrows.length).to.eq(5);
        for (let i = 0; i < 5; i++) {
          expect(escrows[i]).to.eq(allEscrows[i + 5]);
        }
      });

      it('should find third page with third 5 escrows, only 2 items', async () => {
        // get page 1 with 5 items
        let escrows = await escrowManager.getEscrows(3, 5);
        expect(escrows.length).to.eq(5);
        for (let i = 0; i < 1; i++) {
          expect(escrows[i]).to.eq(allEscrows[i + 10]);
        }
      });
    });
  });

  describe('Test one escrow', async () => {
    let escrowContract, escrowAddress;

    before('Create one escrow', async () => {
      const createdEscrow = await createEscrow(
        'One escrow',
        await arbiter.getAddress(),
        await beneficiary.getAddress(),
        deposit1Eth
      );
      escrowAddress = createdEscrow.escrowAddress;
      const Escrow = await ethers.getContractFactory('Escrow');
      escrowContract = await Escrow.attach(escrowAddress);
    });

    it('should be funded initially', async function () {
      let balance = await ethers.provider.getBalance(escrowAddress);
      expect(balance).to.eq(deposit1Eth);
    });

    describe('after approval from address other than the arbiter', () => {
      it('should revert', async () => {
        await expect(escrowContract.connect(beneficiary).approve()).to.be.reverted;
      });
    });

    describe('after approval from the arbiter', () => {
      it('should transfer balance to beneficiary', async () => {
        const before = await ethers.provider.getBalance(beneficiary.getAddress());

        const approveTxn = await escrowContract.connect(arbiter).approve();
        await approveTxn.wait();
        await expect(approveTxn).to.emit(escrowContract, 'Approved').withArgs(deposit1Eth);

        const after = await ethers.provider.getBalance(beneficiary.getAddress());
        expect(after.sub(before)).to.eq(deposit1Eth);
      });
    });
  });
});
