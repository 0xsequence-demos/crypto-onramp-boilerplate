import { TokenImage } from "@0xsequence/design-system";
import { networkInfo } from "../../../utils/config";
import { formatPrettyBalance } from "../../../utils/formatPrettyBalance";
import { useAccount } from "wagmi";
import { useGetNativeTokenBalance } from "@0xsequence/hooks";
import { contractInfo } from "../../../utils/helpers";

export function NativeBalance() {
  const { address } = useAccount();

  const tokenBalance = useGetNativeTokenBalance({
    chainIds: [contractInfo.chainId],
    accountAddress: address,
  });

  const balance = tokenBalance?.data?.[0]?.balance || "0";
  const symbol = networkInfo?.nativeToken.symbol;
  const decimals = networkInfo?.nativeToken.decimals;
  const imageSrc = networkInfo?.logoURI;

  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1 items-center sm:items-start pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-r border-white/10 sm:mr-4">
      <dt className="text-14 text-grey-100 col-span-2 leading-tight">
        Native balance
      </dt>
      <dd className="flex gap-2 items-center col-span-3">
        {imageSrc ? (
          <span className="size-5">
            <TokenImage src={imageSrc} symbol={symbol} size="sm" />
          </span>
        ) : null}
        <span className="flex items-baseline gap-[0.33ex]">
          {balance ? formatPrettyBalance(balance, decimals) : <>Loading</>}
          <span className="text-12 font-medium text-grey-200">{symbol}</span>
        </span>
      </dd>
    </div>
  );
}
