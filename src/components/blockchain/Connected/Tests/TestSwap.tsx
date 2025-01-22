import { useSwapModal, type SwapModalSettings } from "@0xsequence/kit-checkout";
import { ethers } from "ethers";
import { swapTokenAddress } from "../../../../utils/helpers";
import { useEffect, useRef } from "react";

const TestSwap = (props: { balance: string }) => {
  const { balance } = props;
  const previousBalance = useRef<string | undefined>(undefined);
  const { openSwapModal } = useSwapModal();

  useEffect(() => {
    if (balance !== "0" && balance !== previousBalance.current) {
      console.log("Balance updated:", {
        previous: previousBalance.current,
        balance: balance,
      });

      if (previousBalance.current && previousBalance.current !== "0") {
        onClick();
      }

      previousBalance.current = balance;
    }
  }, [balance]);

  const onClick = () => {
    const chainId = 137;
    const currencyAddress = swapTokenAddress;
    const currencyAmount = "2000";

    const contractAbiInterface = new ethers.Interface(["function demo()"]); // Optionally, replace with your contract's abi interface

    const data = contractAbiInterface.encodeFunctionData(
      "demo",
      [],
    ) as `0x${string}`; // Optionally, replace 'demo' with the function you want to call,

    const swapModalSettings: SwapModalSettings = {
      onSuccess: () => {
        console.log("swap successful!");
      },
      chainId,
      currencyAddress,
      currencyAmount,
      postSwapTransactions: [
        // Optionally, replace with the transaction you would like to execute after the swap has taken place.
        {
          to: "0x37470dac8a0255141745906c972e414b1409b470",
          data,
        },
      ],
      title: "Swap and Pay",
      description: "Select a token in your wallet to swap to 0.02 USDC.",
    };

    openSwapModal(swapModalSettings);
  };

  return <button onClick={onClick}>Swap and Pay</button>;
};

export default TestSwap;
