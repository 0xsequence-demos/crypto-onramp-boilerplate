import { Box, Text, TokenImage } from "@0xsequence/design-system";
import { ContractInfo, SequenceIndexer } from "@0xsequence/indexer";
import { allNetworks } from "@0xsequence/network";
import { useEffect, useState } from "react";
import { Address, Chain } from "viem";
import { tokenAddress } from "./Tests/swapTokenAddress";

const projectAccessKey =
  import.meta.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY ||
  "AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM";

const UsdcBalance = (props: {
  chain: Chain;
  address: Address;
  onBalanceChange: (newBalance: string) => void;
}) => {
  const { chain, address, onBalanceChange } = props;
  const [balance, setBalance] = useState<string | undefined>("0");
  const [contractInfo, setContractInfo] = useState<ContractInfo | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!address || !chain) return;

    const loadNativeNetworkBalance = async (chainId: number) => {
      const chainName = allNetworks.find(
        (chainInfo) => chainInfo.chainId === chainId,
      )?.name;
      if (!chainName) {
        setBalance("ERROR");
        return;
      }
      const indexer = new SequenceIndexer(
        `https://${chainName}-indexer.sequence.app`,
        projectAccessKey,
      );
      const tokenBalances = await indexer.getTokenBalances({
        accountAddress: address,
        contractAddress: tokenAddress,
        includeMetadata: true,
      });

      if (tokenBalances?.balances?.length > 0) {
        const [firstBalance] = tokenBalances.balances;
        setBalance(firstBalance.balance);
        onBalanceChange(firstBalance.balance);

        if (firstBalance.contractInfo) {
          setContractInfo(firstBalance.contractInfo);
        }
      }
    };

    loadNativeNetworkBalance(chain.id).then(() => console.log("Done"));
  }, [address, chain]);

  return (
    <Box display="flex" gap="2" alignItems="center">
      <TokenImage src={contractInfo?.logoURI} symbol={contractInfo?.symbol} />
      <Text variant="large" fontWeight="bold" color="text100">
        {contractInfo?.symbol} balance: {balance || "loading..."}
      </Text>
    </Box>
  );
};

export default UsdcBalance;
