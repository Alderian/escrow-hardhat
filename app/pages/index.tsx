import { Contract, ContractReceipt, ContractTransaction, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from '../components/deploy';
import EscrowItem, { EscrowItemProps } from '../components/EscrowItem';
import { escrowManagerContractAddress } from '../components/artifacts/escrowManager.config';
import { EscrowManager__factory, Escrow__factory } from '../components/artifacts/typechain';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

export async function approve(escrowContract: Contract, signer: JsonRpcSigner): Promise<ContractReceipt> {
  const approveTxn: ContractTransaction = await escrowContract.connect(signer).approve();
  return approveTxn.wait();
}

export default function Home() {
  const [escrows, setEscrows] = useState<EscrowItemProps[]>([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [provider, setProvider] = useState<Web3Provider>();
  const [loadingEscrows, setLoadingEscrows] = useState(false);

  useEffect(() => {
    if (!provider) {
      if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
        const provider = new Web3Provider(window.ethereum);
        setProvider(provider);
      }
    }
  }, [provider]);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider!.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider!.getSigner());
    }

    if (provider && !account && !signer) {
      getAccounts();
    }
  });

  useEffect(() => {
    async function getEscrows() {
      setLoadingEscrows(true);
      debugger
      const factory = new Contract(escrowManagerContractAddress, EscrowManager__factory.abi, signer);
      const escrowAddresses = await factory.getEscrows(1, 10);

      const escrows: EscrowItemProps[] = await Promise.all(
        escrowAddresses
          .filter((e: string) => e !== '0x0000000000000000000000000000000000000000')
          .map(async (e: string) => {
            const escrowContract = new Contract(e, Escrow__factory.abi, signer);

            const arbiter = await escrowContract.arbiter();
            const beneficiary = await escrowContract.beneficiary();
            const isApproved = await escrowContract.isApproved();
            const balance = await provider!.getBalance(escrowContract.address);

            return {
              address: escrowContract.address,
              arbiter,
              beneficiary,
              isApproved,
              value: ethers.utils.formatEther(balance),
              handleApprove: async () => {
                escrowContract.on('Approved', () => {
                  document.getElementById(escrowContract.address)!.className = 'complete';
                  document.getElementById(escrowContract.address)!.innerText =
                    "✓ It's been approved!";
                });

                await approve(escrowContract, signer!);
              },
            };
          })
      );

      setEscrows(escrows);
      setLoadingEscrows(false);
    }

    if (provider && account && signer && escrows.length === 0 && !loadingEscrows) {
      getEscrows();
    }
  });

  async function newContract() {
    const beneficiary = (document.getElementById('beneficiary') as HTMLInputElement)!.value;
    const arbiter = (document.getElementById('arbiter') as HTMLInputElement)!.value;
    const value = ethers.BigNumber.from(
      ethers.utils.parseUnits((document.getElementById('wei') as HTMLInputElement)!.value, 'ether')
    );
    const escrowContract = await deploy(signer!, 'test', arbiter, beneficiary, value);

    const escrow: EscrowItemProps = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      isApproved: false,
      value: ethers.utils.formatEther(value),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address)!.className = 'complete';
          document.getElementById(escrowContract.address)!.innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer!);
      },
    };

    setEscrows([escrow, ...escrows]);
  }

  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Eth)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <EscrowItem key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}
