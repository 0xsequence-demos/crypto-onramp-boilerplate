import { Box } from "@0xsequence/design-system";
import { Address, Chain } from "viem";
import ActiveNetwork from "./ActiveNetwork";
import NativeBalance from "./NativeBalance";
import UsdcBalance from "./UsdcBalance";

const ChainInfo = (props: {
  chain: Chain;
  address: Address;
  onBalanceChange: (newBalance: string) => void;
}) => {
  const { chain, address, onBalanceChange } = props;

  return (
    <Box marginBottom="8">
      <Box
        display="flex"
        gap="4"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <ActiveNetwork chain={chain} />
      </Box>
      <NativeBalance chain={chain} address={address} />
      <UsdcBalance
        chain={chain}
        address={address}
        onBalanceChange={onBalanceChange}
      />
    </Box>
  );
};

export default ChainInfo;
