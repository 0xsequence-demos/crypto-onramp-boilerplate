import Home from "./Home";
import { SequenceKit } from "@0xsequence/kit";
import { config } from "./config";
import { KitCheckoutProvider } from "@0xsequence/kit-checkout";
import "@0xsequence/design-system/styles.css";

const App = () => {
  return (
    <SequenceKit config={config}>
      <KitCheckoutProvider>
        <Home />
      </KitCheckoutProvider>
    </SequenceKit>
  );
};

export default App;
