import { TokenImage } from "@0xsequence/design-system";
import { contractInfo } from "../../../utils/helpers";
import { formatPrettyBalance } from "../../../utils/formatPrettyBalance";
import { useGetTokenBalancesByContract } from "@0xsequence/hooks";
import { useAccount } from "wagmi";
import { useEffect } from "react";

type UsdcBalanceProps = {
  onBalanceChange: (newBalance: string) => void;
};

export function UsdcBalance({ onBalanceChange }: UsdcBalanceProps) {
  const { address } = useAccount();

  const tokenBalances = useGetTokenBalancesByContract({
    chainIds: [contractInfo.chainId],
    filter: {
      contractAddresses: [contractInfo.address],
      accountAddresses: [address as string],
    },
    omitMetadata: false,
  });

  const balance = tokenBalances?.data?.pages?.[0].balances?.[0]?.balance || "0",
    name = contractInfo?.name,
    symbol = contractInfo?.symbol,
    decimals = contractInfo?.decimals,
    imageSrc = contractInfo?.logoURI;

  useEffect(() => {
    onBalanceChange(balance);
  }, [balance]);

  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1">
      <dt className="text-14 text-grey-100 col-span-2 leading-tight">
        {name} balance
      </dt>
      <dd className="flex gap-2 items-center col-span-3">
        {imageSrc ? (
          <span className="size-5">
            <TokenImage src={imageSrc} symbol={symbol} size="sm" />
          </span>
        ) : null}
        <span className="flex items-baseline gap-[0.33ex]">
          {formatPrettyBalance(balance, decimals) || "loading..."}
          <span className="text-12 font-medium text-grey-200">{symbol}</span>
        </span>
      </dd>
    </div>
  );
}
