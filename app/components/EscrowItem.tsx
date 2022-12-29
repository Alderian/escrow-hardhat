export interface EscrowItemProps {
  address: string,
  arbiter: string,
  beneficiary: string,
  value: string,
  isApproved?: boolean,
  handleApprove: () => Promise<void>;
}

export default function EscrowItem({
  address,
  arbiter,
  beneficiary,
  value,
  isApproved,
  handleApprove,
}: EscrowItemProps) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Escrow </div>
          <div> {address} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} ETH</div>
        </li>
        {isApproved ? (
          <div className="complete">✓ It&apos;s been approved</div>
        ) : (
          <div
            className="button"
            id={address}
            onClick={(e) => {
              e.preventDefault();

              handleApprove();
            }}
          >
            Approve
          </div>
        )}
      </ul>
    </div>
  );
}
