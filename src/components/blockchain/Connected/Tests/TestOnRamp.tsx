import { useAddFundsModal } from "@0xsequence/kit-checkout";
import { useAccount } from "wagmi";

const TestOnRamp = () => {
  const { triggerAddFunds: toggleAddFunds } = useAddFundsModal();
  const { address } = useAccount();

  const onClick = () => {
    toggleAddFunds({
      walletAddress: address!,
      defaultCryptoCurrency: "USDC",
      cryptoCurrencyList: "USDC",
      fiatCurrency: "USD",
      networks: "arbitrum",
      // cryptoCurrencyList: "USDT,BTC,USDC",
      onClose: () => console.log("User closed the popup"),
    });
  };

  return <button onClick={onClick}>Add Funds</button>
};

export default TestOnRamp;
