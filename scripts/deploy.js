require('dotenv').config();
const { ethers, network } = require('hardhat');

const fs = require('fs');

async function main() {
  //get the signer that we will use to deploy
  const [deployer] = await ethers.getSigners();

  console.log('Deployer:', deployer.address);
  console.log('Balance:', ethers.utils.formatEther(await deployer.getBalance()));

  //Get the EscrowManager smart contract object and deploy it
  const EscrowManager = await ethers.getContractFactory('EscrowManager');
  const escrowManager = await EscrowManager.deploy();

  // await escrowManager.deployed()

  console.log('EscrowManager deployed:', escrowManager.address);
  console.log('Balance after deploy:', ethers.utils.formatEther(await deployer.getBalance()));
  console.log('current network: ' + network.name);
  console.log('current chain id: ' + network.config.chainId);

  //Pull the address and ABI out while you deploy, since that will be key in interacting with the smart contract later
  const data = {
    address: escrowManager.address,
    abi: JSON.parse(escrowManager.interface.format('json')),
  };

  //This writes the ABI and address to the escrowManager.json
  //This data is then used by frontend files to connect with the smart contract
  fs.writeFileSync(
    './app/src/artifacts/contracts/EscrowManager.sol/EscrowManager.json',
    JSON.stringify(data)
  );

  console.log(
    'To verify contract run: ',
    `npx hardhat verify --network "${network.name}" "${escrowManager.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
