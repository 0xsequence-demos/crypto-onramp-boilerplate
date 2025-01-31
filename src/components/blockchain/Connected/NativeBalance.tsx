import { SequenceIndexer } from "@0xsequence/indexer";
import { allNetworks } from "@0xsequence/network";
import { useEffect, useState } from "react";
import { formatUnits, Address, Chain } from "viem";

const projectAccessKey =
  import.meta.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY ||
  "AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM";

const NativeBalance = (props: { chain: Chain; address: Address }) => {
  const { chain, address } = props;
  const [balance, setBalance] = useState<string | undefined>();

  useEffect(() => {
    if (!address || !chain) return;

    const loadNativeNetworkBalance = async (chainId: number) => {
      const chainName = allNetworks.find(
        (chainInfo) => chainInfo.chainId === chainId,
      )?.name;
      if (!chainName) {
        setBalance("ERROR");
        return;
      }
      const indexer = new SequenceIndexer(
        `https://${chainName}-indexer.sequence.app`,
        projectAccessKey,
      );
      const tokenBalances = await indexer.getEtherBalance({
        accountAddress: address,
      });
      if (tokenBalances) setBalance(tokenBalances?.balance?.balanceWei);
    };

    loadNativeNetworkBalance(chain.id).then(() => console.log("Done"));
  }, [address, chain]);

  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1 items-center sm:items-start pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-r border-white/10 sm:mr-4">
      <dt className="text-14 text-grey-100 col-span-2 leading-tight">
        Native balance
      </dt>
      <dd className="flex gap-1 items-baseline col-span-3">
        {balance ? (
          <>
            <>
              {formatUnits(
                BigInt(parseInt(balance)),
                chain.nativeCurrency.decimals,
              )}
            </>{" "}
            <span className="text-12 font-medium text-grey-200">
              {chain.nativeCurrency.symbol}
            </span>
          </>
        ) : (
          "loading..."
        )}
      </dd>
    </div>
  );
};

export default NativeBalance;
