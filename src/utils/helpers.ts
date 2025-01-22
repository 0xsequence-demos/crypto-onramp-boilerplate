export function truncateDecimals(numberString: string) {
  if (!numberString.includes(".")) return numberString;
  const [integerPart, decimalPart] = numberString.split(".");
  return `${integerPart}.${decimalPart?.slice(0, 6)}`;
}

export const swapTokenAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
