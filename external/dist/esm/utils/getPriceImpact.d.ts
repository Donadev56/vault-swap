import type { Token } from "@lifi/sdk";
interface GetPriceImpractProps {
  fromToken: Token;
  toToken: Token;
  fromAmount?: bigint;
  toAmount?: bigint;
}
export declare const getPriceImpact: ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: GetPriceImpractProps) => number;
export {};
