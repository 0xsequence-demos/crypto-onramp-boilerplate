import { useAccount } from "wagmi";

import "./Home.css";
import { Footer } from "./components/Footer";
import Connected from "./components/blockchain/Connected";
import NotConnected from "./components/blockchain/NotConnected";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <div>
      <h1>Sequence Crypto On-ramp Boilerplate</h1>
      <h2 className="homepage__marginBtNormal">Embedded Wallet</h2>
      {isConnected ? <Connected /> : <NotConnected />}
      <Footer />
    </div>
  );
};

export default Home;
