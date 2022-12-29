import { ethers, network } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

async function main() {
  //get the signer that we will use to deploy
  const [deployer] = await ethers.getSigners();

  console.log('Deployer:', deployer.address);
  console.log('Balance:', ethers.utils.formatEther(await deployer.getBalance()));

  //Get the EscrowManager smart contract object and deploy it
  const EscrowManager = await ethers.getContractFactory('EscrowManager');
  const escrowManager = await EscrowManager.deploy();

  await escrowManager.deployed();

  fs.writeFileSync(
    './app/components/artifacts/escrowManager.config.ts',
    `export const escrowManagerContractAddress = "${escrowManager.address}"`
  );

  console.log('EscrowManager deployed:', escrowManager.address);
  console.log('Balance after deploy:', ethers.utils.formatEther(await deployer.getBalance()));
  console.log('current network: ' + network.name);
  console.log('current chain id: ' + network.config.chainId);
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
