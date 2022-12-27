import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from '../components/deploy';
import EscrowItem from '../components/EscrowItem';
import EscrowManager from '../components/artifacts/contracts/EscrowManager.sol/EscrowManager';
import Escrow from '../components/artifacts/contracts/Escrow.sol/Escrow';

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export default function Home() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const [loadingEscrows, setLoadingEscrows] = useState(false);

  useEffect(() => {
    if (!provider) {
      if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      }
    }
  });

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    if (provider && !account && !signer) {
      getAccounts();
    }
  }, [provider]);

  useEffect(() => {
    async function getEscrows() {
      setLoadingEscrows(true);
      const factory = new Contract(EscrowManager.address, EscrowManager.abi, signer);
      const escrowAddresses = await factory.getEscrows(1, 10);

      const escrows = await await Promise.all(
        escrowAddresses
          .filter((e) => e !== '0x0000000000000000000000000000000000000000')
          .map(async (e) => {
            const escrowContract = new Contract(e, Escrow.abi, signer);

            const arbiter = await escrowContract.arbiter();
            const beneficiary = await escrowContract.beneficiary();
            const isApproved = await escrowContract.isApproved();
            const balance = await provider.getBalance(escrowContract.address);

            return {
              address: escrowContract.address,
              arbiter,
              beneficiary,
              isApproved,
              value: ethers.utils.formatEther(balance),
              handleApprove: async () => {
                escrowContract.on('Approved', () => {
                  document.getElementById(escrowContract.address).className = 'complete';
                  document.getElementById(escrowContract.address).innerText =
                    "✓ It's been approved!";
                });

                await approve(escrowContract, signer);
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
  }, [provider, account, signer]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.BigNumber.from(
      ethers.utils.parseUnits(document.getElementById('wei').value, 'ether')
    );
    const escrowContract = await deploy(signer, 'test', arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: ethers.utils.formatEther(value),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className = 'complete';
          document.getElementById(escrowContract.address).innerText = "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
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
