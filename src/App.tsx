import Home from "./Home";
import { SequenceConnect } from "@0xsequence/connect";
import { SequenceCheckoutProvider } from "@0xsequence/checkout";
import { SequenceWalletProvider } from "@0xsequence/wallet-widget";
import { config } from "./config";

const App = () => {
  return (
    <SequenceConnect config={config}>
      <SequenceWalletProvider>
        <SequenceCheckoutProvider>
          <Home />
        </SequenceCheckoutProvider>
      </SequenceWalletProvider>
    </SequenceConnect>
  );
};

export default App;
