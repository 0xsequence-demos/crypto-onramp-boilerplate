import { formatUnits } from "viem";

import { formatDisplay } from "./formatDisplay";
import { limitDecimals } from "./limitDecimals";

export function formatPrettyBalance(
  balance: string,
  decimals?: number,
  limitLength: number = 5,
) {
  const balanceBigInt =
    balance && typeof balance === "string" ? BigInt(balance) : BigInt(0);

  return decimals
    ? limitDecimals(
        formatDisplay(formatUnits(balanceBigInt, decimals)),
        limitLength,
      )
    : balance;
}
