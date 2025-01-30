import { TokenImage } from "@0xsequence/design-system";
import { ContractInfo, SequenceIndexer } from "@0xsequence/indexer";
import { allNetworks } from "@0xsequence/network";
import { useState } from "react";
import { Address, Chain } from "viem";
import { swapTokenAddress } from "../../../utils/helpers";
import { useQuery } from "@tanstack/react-query";

const projectAccessKey =
  import.meta.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY ||
  "AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM";

const loadTokenBalance = async (
  chainId: number,
  address: string,
  tokenAddress: string,
  projectAccessKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allNetworks: any[],
  setBalance: (balance: string) => void,
  onBalanceChange: (balance: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContractInfo: (info: any) => void,
) => {
  const chainName = allNetworks.find(
    (chainInfo) => chainInfo.chainId === chainId,
  )?.name;
  if (!chainName) {
    return { error: "Chain name not found" };
  }

  const indexer = new SequenceIndexer(
    `https://${chainName}-indexer.sequence.app`,
    projectAccessKey,
  );
  const tokenBalances = await indexer.getTokenBalances({
    accountAddress: address,
    contractAddress: tokenAddress,
    includeMetadata: true,
  });

  if (tokenBalances?.balances?.length > 0) {
    const [firstBalance] = tokenBalances.balances;

    setBalance(firstBalance.balance);
    onBalanceChange(firstBalance.balance);

    if (firstBalance.contractInfo) {
      setContractInfo(firstBalance.contractInfo);
    }

    return {
      balance: firstBalance.balance,
      contractInfo: firstBalance.contractInfo,
    };
  } else {
    setBalance("0");
    return { error: "No token balances found" };
  }
};

const UsdcBalance = (props: {
  chain: Chain;
  address: Address;
  onBalanceChange: (newBalance: string) => void;
}) => {
  const { chain, address, onBalanceChange } = props;
  const [balance, setBalance] = useState<string | undefined>("0");
  const [contractInfo, setContractInfo] = useState<ContractInfo | undefined>(
    undefined,
  );
  useQuery({
    queryKey: ["tokenBalance", chain?.id, address, swapTokenAddress],
    queryFn: () =>
      loadTokenBalance(
        chain?.id,
        address,
        swapTokenAddress,
        projectAccessKey,
        allNetworks,
        setBalance,
        onBalanceChange,
        setContractInfo,
      ),
    retry: false,
    refetchInterval: 10000,
    enabled:
      !!chain?.id && !!address && !!swapTokenAddress && !!allNetworks.length,
  });
  if (!contractInfo) {
    return (
      <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1">
        <dt className="text-14 text-grey-100 col-span-2">-- balance</dt>
        <dd className="flex gap-2 items-center col-span-3">Unknown contract</dd>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1">
      {" "}
      <dt className="text-14 text-grey-100 col-span-2 leading-tight">
        {contractInfo?.name} balance
      </dt>
      <dd className="flex gap-2 items-center col-span-3">
        <TokenImage
          src={contractInfo?.logoURI}
          symbol={contractInfo?.symbol}
          size="sm"
        />
        {balance || "loading..."} {contractInfo?.symbol}
      </dd>
    </div>
  );
};

export default UsdcBalance;
