export function truncateDecimals(numberString: string) {
  if (!numberString.includes(".")) return numberString;
  const [integerPart, decimalPart] = numberString.split(".");
  return `${integerPart}.${decimalPart?.slice(0, 6)}`;
}
// USDC on Polygon
export const swapTokenAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

// Transak Amoy
// export const swapTokenAddress = "0x0c86A754A29714C4Fe9C6F1359fa7099eD174c0b";
