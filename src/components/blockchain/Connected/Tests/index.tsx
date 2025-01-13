import { Box } from "@0xsequence/design-system";
import TestOnRamp from "./TestOnRamp";
import TestSwap from "./TestSwap";

const Tests = (props: { chainId: number }) => {
  const { chainId } = props;
  console.log(chainId);

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <TestOnRamp />
      <TestSwap />
    </Box>
  );
};

export default Tests;
