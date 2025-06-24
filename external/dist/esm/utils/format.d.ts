/**
 * Format token amount to at least 6 decimals.
 * @param amount amount to format.
 * @returns formatted amount.
 */
export declare function formatTokenAmount(
  amount: bigint | undefined,
  decimals: number,
): string;
export declare function formatSlippage(
  slippage?: string,
  defaultValue?: string,
  returnInitial?: boolean,
): string;
export declare function formatInputAmount(
  amount: string,
  decimals?: number | null,
  returnInitial?: boolean,
): string;
export declare function formatTokenPrice(
  amount?: string | bigint,
  price?: string,
  decimals?: number,
): number;
