export function truncateDecimals(numberString: string) {
  if (!numberString.includes(".")) return numberString;
  const [integerPart, decimalPart] = numberString.split(".");
  return `${integerPart}.${decimalPart?.slice(0, 6)}`;
}

export const contractInfo = {
  logoURI:
    "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  symbol: "USDC",
  name: "USDC",
  decimals: 6,
  address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // Swap Token Address - USDC on Polygon
  chainId: 137,
};

// USDC on Polygon Amoy
// export const swapTokenAddress = "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";

// Transak Amoy
// export const swapTokenAddress = "0x0c86A754A29714C4Fe9C6F1359fa7099eD174c0b";
