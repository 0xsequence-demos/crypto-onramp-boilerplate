import { useCallback, useEffect, useState } from "react";
import {
  SwapModalSettings,
  useAddFundsModal,
  useSwapModal,
} from "@0xsequence/kit-checkout";
import { ethers } from "ethers";
import { swapTokenAddress } from "../utils/helpers";

export const useAddFundsWithSwapHandler = ({
  hasBalanceChanged,
}: {
  hasBalanceChanged: boolean;
}) => {
  const [readyToSwap, setReadyToSwap] = useState(false);
  const { triggerAddFunds, addFundsSettings, closeAddFunds } =
    useAddFundsModal();
  const { openSwapModal } = useSwapModal();

  useEffect(() => {
    console.log("Ready to swap modified");
    if (hasBalanceChanged && readyToSwap) {
      handleOnSwap();
      setReadyToSwap(false);
    }
  }, [readyToSwap, hasBalanceChanged]);

  const handleOnSwap = useCallback(() => {
    const chainId = 137;
    const currencyAddress = swapTokenAddress;
    const currencyAmount = "2000";

    const contractAbiInterface = new ethers.Interface(["function demo()"]); // Replace with the actual ABI if necessary

    const data = contractAbiInterface.encodeFunctionData(
      "demo",
      [],
    ) as `0x${string}`; // Replace 'demo' if necessary

    const swapModalSettings: SwapModalSettings = {
      onSuccess: () => {
        console.log("swap successful!");
      },
      chainId,
      currencyAddress,
      currencyAmount,
      postSwapTransactions: [
        {
          to: "0x37470dac8a0255141745906c972e414b1409b470",
          data,
        },
      ],
      title: "Swap and Pay",
      description: "Select a token in your wallet to swap to 0.02 USDC.",
    };

    openSwapModal(swapModalSettings);
  }, [openSwapModal]);

  const handleAddFundsWithSwap = useCallback(
    (address: string) => {
      triggerAddFunds({
        walletAddress: address,
        defaultCryptoCurrency: "POL",
        cryptoCurrencyList: "POL",
        networks: "polygon",
        onOrderCreated(data) {
          console.log("Order created successfully", data);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onOrderSuccessful(_: void) {
          setReadyToSwap(true);
        },
        onOrderFailed(data) {
          console.warn("An error occurred", data);
        },
        onClose: () => console.log("User closed the popup"),
      });
    },
    [triggerAddFunds],
  );

  return { handleAddFundsWithSwap, addFundsSettings, closeAddFunds };
};
