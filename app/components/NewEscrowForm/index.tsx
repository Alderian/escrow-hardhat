import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ContractReceipt, ContractTransaction, ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import deploy from '@/components/deploy';
import { EscrowItemProps } from "@/components/EscrowItem";

export interface NewEscrowFormProps {
    setEscrows: Dispatch<SetStateAction<EscrowItemProps[]>>,
    escrows: EscrowItemProps[],
    signer: JsonRpcSigner
}

export async function approve(escrowContract: Contract, signer: JsonRpcSigner): Promise<ContractReceipt> {
    const approveTxn: ContractTransaction = await escrowContract.connect(signer).approve();
    return approveTxn.wait();
}

export default function NewEscrowForm({ setEscrows, escrows, signer }: NewEscrowFormProps) {
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
        <div className="w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-4 mx-auto px-16 py-4 rounded-lg">
            <h2 className="text-center text-3xl font-bold tracking-wide text-gray-800">Create new escrow contract</h2>

            <form className="my-8 text-sm grid lg:grid-cols-2 gap-4">
                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Escrow name</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter the escrow name" ></input>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="email" className="text-gray-700">Arbiter Address</label>
                    <input type="text" name="arbiter" id="arbiter" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="0x..." ></input>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="email" className="text-gray-700">Beneficiary Address</label>
                    <input type="text" name="beneficiary" id="beneficiary" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="0x..." ></input>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="email" className="text-gray-700">Deposit Amount (in Eth)</label>
                    <input type="text" name="wei" id="wei" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="1.0" ></input>
                </div>

                <div className="flex flex-col my-4">
                    <div className=" flex items-center justify-end space-x-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
                            id="deploy"
                            onClick={(e) => {
                                e.preventDefault();
                                newContract();
                            }}
                        >
                            Deploy
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}