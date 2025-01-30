import { useAddFundsModal } from "@0xsequence/kit-checkout";
import { useAccount } from "wagmi";
import { Button } from "boilerplate-design-system";

const TestOnRamp = () => {
  const { triggerAddFunds: toggleAddFunds } = useAddFundsModal();
  const { address } = useAccount();

  const handleAddFunds = () => {
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

  return (
    <Button
      variant="primary"
      subvariants={{ padding: "comfortable" }}
      className="w-full sm:w-auto"
      onClick={handleAddFunds}
    >
      Add Funds
    </Button>
  );
};

export default TestOnRamp;
