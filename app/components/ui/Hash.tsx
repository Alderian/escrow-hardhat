import Link from "next/link";
import * as React from "react";
import { CopyTextToClip } from "@/ui/CopyTextToClip";

const sliceHash = (hash: string) => {
  return hash
    ? `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
    : "0x";
};

export interface HashProps {
  hash: string,
  text?: string,
  path?: string,
  hasLink?: boolean,
  hasCopy?: boolean,
  isCompressed?: boolean,
}

export default function Hash({
  hash = "0x",
  text,
  path,
  hasLink = true,
  hasCopy = true,
  isCompressed = true
}: HashProps) {
  const hrefPath = path ? `/${path}/${hash}` : `/${hash}`;
  const hashText = text ? text : isCompressed ? sliceHash(hash) : hash;

  return (
    <span className="whitespace-nowrap inline-flex flex-wrap text-base">
      {hasLink ? (
        <Link color="primary" href={hrefPath}>
          {hashText}
        </Link>
      ) : (
        <span>
          hashText
        </span>
      )}
      {hasCopy && (
        <span>
          <CopyTextToClip text={hash} className="w-5 h-5" />
        </span>
      )}
    </span>
  );
}
