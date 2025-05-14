import { NetworkImage } from "@0xsequence/design-system";
import { networkInfo } from "../../../utils/config";

export function ActiveNetwork() {
  const chainId = networkInfo?.chainId;
  const name = networkInfo?.title;

  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1 pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-r border-white/10 sm:mr-4">
      <dt className="text-14 text-grey-100 col-span-2">Network</dt>
      <dd className="flex gap-2 items-center col-span-3">
        {chainId ? (
          <span className="size-5">
            <NetworkImage chainId={chainId} size="sm" />
          </span>
        ) : null}
        {name}
      </dd>
    </div>
  );
}
