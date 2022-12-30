import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, Contract, ContractTransaction } from 'ethers';
import { escrowManagerContractAddress } from '@/artifacts/escrowManager.config';
import { EscrowManager__factory } from '@/artifacts/typechain';

export default async function deploy(signer: JsonRpcSigner, name: string, arbiter: string, beneficiary: string, value: BigNumber) {
  const factory = new Contract(escrowManagerContractAddress, EscrowManager__factory.abi, signer);
  const fromTransaction: ContractTransaction = await factory.createEscrow(name, arbiter, beneficiary, { value });

  const rc = await fromTransaction.wait(); // 0ms, as tx is already confirmed
  const event = rc.events?.find((event) => event.event === 'Deployed');
  const [escrowContractAddress] = event?.args || [];

  return new Contract(escrowContractAddress, EscrowManager__factory.abi, signer);
}
