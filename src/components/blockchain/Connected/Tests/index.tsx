import TestOnRamp from "./TestOnRamp";
import TestSwap from "./TestSwap";
import TestOnRampWithSwap from "./TestOnRampWithSwap";
import { Card } from "boilerplate-design-system";

const Tests = (props: {
  chainId: number;
  balance: string;
  previousBalance: string | undefined;
}) => {
  const { balance, previousBalance } = props;

  return (
    <Card className="bg-white/10 border border-white/10 backdrop-blur-sm">
      <TestOnRampWithSwap balance={balance} previousBalance={previousBalance} />
      <TestOnRamp />
      <TestSwap balance={balance} />
    </Card>
  );
};

export default Tests;
