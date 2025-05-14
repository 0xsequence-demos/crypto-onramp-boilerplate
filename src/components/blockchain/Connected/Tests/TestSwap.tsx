import { useSwapModal, type SwapModalSettings } from "@0xsequence/checkout";
import { ethers } from "ethers";
import { contractInfo } from "../../../../utils/helpers";
import { useEffect, useRef } from "react";
import { Button } from "@0xsequence-demos/boilerplate-design-system";

export function TestSwap(props: { balance: string }) {
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
        handleSwapAndPay();
      }

      previousBalance.current = balance;
    }
  }, [balance]);

  const handleSwapAndPay = () => {
    const chainId = 137;
    const toTokenAddress = contractInfo.address;
    const toTokenAmount = "2000";

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
      toTokenAddress,
      toTokenAmount,
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

  return (
    <Button
      variant="primary"
      subvariants={{ padding: "comfortable" }}
      className="w-full sm:w-auto"
      onClick={handleSwapAndPay}
    >
      Swap and Pay
    </Button>
  );
}
