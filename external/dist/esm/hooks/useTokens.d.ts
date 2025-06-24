import type { TokenAmount } from "../types/token.js";
export declare const useTokens: (selectedChainId?: number) => {
  tokens: import("@lifi/sdk").Token[] | undefined;
  featuredTokens: TokenAmount[] | undefined;
  popularTokens: TokenAmount[] | undefined;
  chain: import("@lifi/sdk").ExtendedChain | undefined;
  isLoading: boolean;
};
