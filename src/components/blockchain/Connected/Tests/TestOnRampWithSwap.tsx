import { useAccount } from "wagmi";
import { useAddFundsWithSwapHandler } from "../../../../hooks/useAddFundsHandler";
import { Button } from "boilerplate-design-system";

const TestOnRampWithSwap = (props: {
  balance: string;
  previousBalance: string | undefined;
}) => {
  const { balance, previousBalance } = props;
  const { address } = useAccount();
  const hasBalanceChanged =
    !!previousBalance && previousBalance != "0" && balance != previousBalance;

  const { handleAddFundsWithSwap } = useAddFundsWithSwapHandler({
    hasBalanceChanged,
  });

  return (
    <Button
      variant="primary"
      subvariants={{ padding: "comfortable" }}
      className="w-full sm:w-auto"
      onClick={() => handleAddFundsWithSwap(address!)}
    >
      Add Funds with Swap
    </Button>
  );
};

export default TestOnRampWithSwap;
