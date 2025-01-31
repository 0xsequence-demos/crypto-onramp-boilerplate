import { NetworkImage } from "@0xsequence/design-system";
import { Chain } from "viem";

const ActiveNetwork = (props: { chain: Chain }) => {
  const { chain } = props;
  return (
    <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1 pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-r border-white/10 sm:mr-4">
      <dt className="text-14 text-grey-100 col-span-2">Network</dt>
      <dd className="flex gap-2 items-center col-span-3">
        <NetworkImage chainId={chain.id} size="sm" />
        {chain.name}
      </dd>
    </div>
  );
};

export default ActiveNetwork;
