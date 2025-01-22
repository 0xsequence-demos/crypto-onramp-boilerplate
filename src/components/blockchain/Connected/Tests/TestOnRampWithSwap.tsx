import { useAccount } from "wagmi";
import { useAddFundsWithSwapHandler } from "../../../../hooks/useAddFundsHandler";

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
    <button onClick={() => handleAddFundsWithSwap(address!)}>
      Add Funds with Swap
    </button>
  );
};

export default TestOnRampWithSwap;
