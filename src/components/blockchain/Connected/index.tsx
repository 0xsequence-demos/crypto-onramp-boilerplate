import { useAccount } from "wagmi";
import ChainInfo from "./ChainInfo";
import { useEffect, useRef, useState } from "react";
import { Card } from "boilerplate-design-system";
import TestOnRamp from "./Tests/TestOnRamp";
import TestOnRampWithSwap from "./Tests/TestOnRampWithSwap";
import TestSwap from "./Tests/TestSwap";

const Connected = () => {
  const { address, chain } = useAccount();
  const [balance, setBalance] = useState("0");
  const previousBalance = useRef<string | undefined>(undefined);

  const onBalanceChange = (newBalance: string) => {
    setBalance(newBalance);
  };

  useEffect(() => {
    if (balance !== "0" && balance !== previousBalance.current) {
      console.log("Balance updated:", {
        previous: previousBalance.current,
        balance: balance,
      });

      previousBalance.current = balance;
    }
  }, [balance]);

  return (
    <div className="flex flex-col gap-4">
      {chain && (
        <ChainInfo
          chain={chain}
          address={address!}
          onBalanceChange={onBalanceChange}
        />
      )}
      <Card className="bg-white/10 border border-white/10 backdrop-blur-sm flex-col sm:flex-row flex items-center gap-4 justify-center">
        <TestOnRampWithSwap
          balance={balance}
          previousBalance={previousBalance.current}
        />
        <TestOnRamp />
        <TestSwap balance={balance} />
      </Card>
    </div>
  );
};

export default Connected;
