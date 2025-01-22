import { useAddFundsModal } from "@0xsequence/kit-checkout";
import { useAccount } from "wagmi";

const TestOnRamp = () => {
  const { triggerAddFunds: toggleAddFunds } = useAddFundsModal();
  const { address } = useAccount();

  const onClick = () => {
    toggleAddFunds({
      walletAddress: address!,
      defaultCryptoCurrency: "POL",
      cryptoCurrencyList: "POL",
      networks: "polygon",
      onOrderCreated(data) {
        console.log("Order Created", data);
      },
      onOrderSuccessful(data) {
        console.log("Order Successful", data);
      },
      onOrderFailed(data) {
        console.warn("Order Failed", data);
      },
      onClose: () => console.log("User closed the popup"),
    });
  };

  return <button onClick={onClick}>Add Funds</button>;
};

export default TestOnRamp;
