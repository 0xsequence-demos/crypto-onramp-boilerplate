import Home from "./Home";
import { SequenceConnect } from "@0xsequence/connect";
import { SequenceCheckoutProvider } from "@0xsequence/checkout";
import { config } from "./config";

const App = () => {
  return (
    <SequenceConnect config={config}>
      <SequenceCheckoutProvider>
        <Home />
      </SequenceCheckoutProvider>
    </SequenceConnect>
  );
};

export default App;
