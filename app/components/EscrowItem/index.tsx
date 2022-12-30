import Hash from "@/ui/Hash";

export interface EscrowItemProps {
  name?: string,
  address: string,
  arbiter: string,
  beneficiary: string,
  value: string,
  isApproved?: boolean,
  handleApprove: () => Promise<void>;
}

export default function EscrowItem({
  name,
  address,
  arbiter,
  beneficiary,
  value,
  isApproved,
  handleApprove,
}: EscrowItemProps) {
  return (

    <div className="flex items-start overflow-hidden bg-cover h-min rounded-lg  bg-gray-200">
      <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">

        <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
          {name} <Hash path="address" hash={address} />
        </h2>
        <div className="mt-2 text-md tracking-widest-wider text-blue-500 dark:text-blue-400 ">
          <strong>Arbiter:</strong>{" "}
          <Hash path="address" hash={arbiter} />
        </div>
        <div className="mt-2 text-md tracking-wider text-blue-500 dark:text-blue-400 ">
          <strong>Beneficiary:</strong>{" "}
          <Hash path="address" hash={beneficiary} />
        </div>
        <div className="mt-2 text-md tracking-wider text-blue-500 dark:text-blue-400 ">
          <strong>Value:</strong>{" "}
          {value} ETH
        </div>
        <div className="mt-4 h-11 text-center align-middle">
          {isApproved ? (
            <p className="text-lg tracking-wider text-green-500 dark:text-green-400 "><strong>✓ Approved</strong></p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 text-gray-100 hover:shadow-xl transition duration-150"
                id={address}
                onClick={(e) => {
                  e.preventDefault();
                  handleApprove();
                }}
              >
                Approve
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-blue-100 hover:shadow-xl transition duration-150"
                id={address}
                onClick={(e) => {
                  e.preventDefault();
                  handleApprove();
                }}
              >
                Add funds
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
