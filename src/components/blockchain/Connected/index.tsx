import { Card } from "@0xsequence-demos/boilerplate-design-system";
import { TestOnRamp } from "./Tests/TestOnRamp";
import { TestOnRampWithSwap } from "./Tests/TestOnRampWithSwap";
import { TestSwap } from "./Tests/TestSwap";
import { ActiveNetwork } from "./ActiveNetwork";
import { NativeBalance } from "./NativeBalance";
import { UsdcBalance } from "./UsdcBalance";
import { useEffect, useRef, useState } from "react";

const Connected = () => {
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
      <Card className="grid sm:grid-cols-3 grid-cols-1 gap-y-4 bg-white/10 border border-white/10 backdrop-blur-sm">
        <ActiveNetwork />

        <NativeBalance />

        <UsdcBalance onBalanceChange={onBalanceChange} />
      </Card>
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
