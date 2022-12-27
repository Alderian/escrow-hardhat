import { Contract } from 'ethers';
import EscrowManager from './artifacts/contracts/EscrowManager.sol/EscrowManager';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

export default async function deploy(signer, name, arbiter, beneficiary, value) {
  const factory = new Contract(EscrowManager.address, EscrowManager.abi, signer);
  const fromTransaction = await factory.createEscrow(name, arbiter, beneficiary, { value });

  const rc = await fromTransaction.wait(); // 0ms, as tx is already confirmed
  const event = rc.events.find((event) => event.event === 'Deployed');
  const [escrowContractAddress] = event.args;

  return new Contract(escrowContractAddress, Escrow.abi, signer);
}
