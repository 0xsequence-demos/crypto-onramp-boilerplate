import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

import Connected from "./components/blockchain/Connected";
import NotConnected from "./components/blockchain/NotConnected";
import { SequenceBoilerplate } from "@0xsequence-demos/boilerplate-design-system";
import { useOpenWalletModal } from "@0xsequence/wallet-widget";
const Home = () => {
  const { isConnected } = useAccount();
  const { setOpenWalletModal } = useOpenWalletModal();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/crypto-onramp-boilerplate"
      name="Crypto On-ramp"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
      walletCallback={() => setOpenWalletModal(true)}
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
};

export default Home;
