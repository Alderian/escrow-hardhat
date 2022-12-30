import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import EscrowItem, { EscrowItemProps } from '../components/EscrowItem';
import { escrowManagerContractAddress } from '../components/artifacts/escrowManager.config';
import { EscrowManager__factory, Escrow__factory } from '../components/artifacts/typechain';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import NewEscrowForm, { approve } from '../components/NewEscrowForm';
import Image from 'next/image';

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

  return (
    <>
      <div className="w-full flex items-center justify-around">
        <div className="bg-gray-200 lg:flex items-center space-x-16">
          <NewEscrowForm setEscrows={setEscrows} escrows={escrows} signer={signer!} />
        </div >
        <div className="lg:flex items-stretch">
          <Image
            width={741}
            height={472}
            src="/escrow.png" alt="Escrow" />
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl dark:text-white">Existing Escrows</h1>

          <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
            <div className="lg:mx-12">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Filter contracts</h1>

              <div className="mt-4 space-y-4 lg:mt-8">
                <a href="#" className="block text-blue-500 dark:text-blue-400 hover:underline">Show all</a>
                <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">New</a>
                <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Approved</a>
                <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Waiting your approval</a>
                <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Approved by you</a>
              </div>
            </div>

            <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 ">
                {escrows.map((escrow) => {
                  return <EscrowItem key={escrow.address} {...escrow} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
