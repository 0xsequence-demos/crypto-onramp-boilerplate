import { Box } from "@0xsequence/design-system";
import TestOnRamp from "./TestOnRamp";
import TestSwap from "./TestSwap";
import TestOnRampWithSwap from "./TestOnRampWithSwap";

const Tests = (props: {
  chainId: number;
  balance: string;
  previousBalance: string | undefined;
}) => {
  const { chainId, balance, previousBalance } = props;

  console.log(chainId);
  return (
    <Box display="flex" flexDirection="column" gap="4">
      <TestOnRampWithSwap balance={balance} previousBalance={previousBalance} />
      <TestOnRamp />
      <TestSwap balance={balance} />
    </Box>
  );
};

export default Tests;
