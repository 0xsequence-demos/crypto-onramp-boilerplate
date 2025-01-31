import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

import Connected from "./components/blockchain/Connected";
import NotConnected from "./components/blockchain/NotConnected";
import { SequenceBoilerplate } from "boilerplate-design-system";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/crypto-onramp-boilerplate"
      name="Crypto On-ramp"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
};

export default Home;
