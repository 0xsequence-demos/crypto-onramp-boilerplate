import { Text } from "@0xsequence/design-system";
import { useAccount } from "wagmi";
import ChainInfo from "./ChainInfo";
import Disconnect from "./Disconnect";
import Tests from "./Tests";
import { Missing } from "../../Missing";
import { useEffect, useRef, useState } from "react";

const Connected = () => {
  const { address, chain, chainId } = useAccount();
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

  if (!address) {
    return <Missing>an address</Missing>;
  }

  if (!chain) {
    return <Missing>a chain</Missing>;
  }

  if (!chainId) {
    return <Missing>a chainId</Missing>;
  }

  return (
    <>
      <Text variant="large" fontWeight="bold" color="text100">
        Connected with address: {address}
      </Text>
      <Disconnect />
      {chain && (
        <ChainInfo
          chain={chain}
          address={address!}
          onBalanceChange={onBalanceChange}
        />
      )}
      <Tests
        chainId={chainId!}
        balance={balance}
        previousBalance={previousBalance.current}
      />
    </>
  );
};

export default Connected;
