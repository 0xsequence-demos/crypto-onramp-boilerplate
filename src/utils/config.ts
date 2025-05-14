import { SequenceIndexer } from "@0xsequence/indexer";
import { allNetworks } from "@0xsequence/network";

const chainId = 137;

const projectAccessKey =
  import.meta.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY ||
  "AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM";

export const networkInfo = allNetworks.find(
  (chainInfo) => chainInfo.chainId === chainId,
);

if (!networkInfo) {
  throw new Error("Unknown network");
}

export const indexer = new SequenceIndexer(
  networkInfo.indexerUrl!,
  projectAccessKey,
);
