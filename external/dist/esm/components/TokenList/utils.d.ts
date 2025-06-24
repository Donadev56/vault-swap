import type { TokenAmount } from "../../types/token.js";
export declare const filteredTokensComparator: (
  searchFilter: string,
) => (tokenA: TokenAmount, tokenB: TokenAmount) => 0 | 1 | -1;
