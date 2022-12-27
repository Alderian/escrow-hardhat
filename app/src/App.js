import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import EscrowItem from './EscrowItem';
import EscrowManager from './artifacts/contracts/EscrowManager.sol/EscrowManager';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    async function getEscrows() {
      const factory = new Contract(EscrowManager.address, EscrowManager.abi, signer);
      const escrowAddresses = await factory.getEscrows(1, 10);
      console.log(escrowAddresses);

      const escrows = await await Promise.all(
        escrowAddresses
          .filter((e) => e !== '0x0000000000000000000000000000000000000000')
          .map(async (e) => {
            const escrowContract = new Contract(e, Escrow.abi, signer);

            console.log(escrowContract);

            const arbiter = await escrowContract.arbiter();
            const beneficiary = await escrowContract.beneficiary();
            const isApproved = await escrowContract.isApproved();
            const balance = await provider.getBalance(escrowContract.address);

            console.log(balance);
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

      console.log(escrows);

      setEscrows(escrows);
    }

    getAccounts();
    getEscrows();
  }, [account]);

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

        console.log(escrowContract, signer);
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

export default App;
