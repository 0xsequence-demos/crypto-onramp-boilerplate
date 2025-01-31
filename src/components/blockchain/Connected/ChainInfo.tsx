import { Address, Chain } from "viem";
import ActiveNetwork from "./ActiveNetwork";
import NativeBalance from "./NativeBalance";
import UsdcBalance from "./UsdcBalance";
import { Card } from "boilerplate-design-system";

const ChainInfo = (props: {
  chain: Chain;
  address: Address;
  onBalanceChange: (newBalance: string) => void;
}) => {
  const { chain, address, onBalanceChange } = props;

  return (
    <Card className="grid sm:grid-cols-3 grid-cols-1 gap-y-4 bg-white/10 border border-white/10 backdrop-blur-sm">
      <ActiveNetwork chain={chain} />

      <NativeBalance chain={chain} address={address} />

      <UsdcBalance
        chain={chain}
        address={address}
        onBalanceChange={onBalanceChange}
      />
    </Card>
  );
};

export default ChainInfo;
