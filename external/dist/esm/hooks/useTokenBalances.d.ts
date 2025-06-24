import type { TokenAmount } from "../types/token.js";
export declare const useTokenBalances: (selectedChainId?: number) => {
  tokens: import("@lifi/sdk").Token[] | undefined;
  tokensWithBalance: TokenAmount[] | undefined;
  featuredTokens: TokenAmount[] | undefined;
  popularTokens: TokenAmount[] | undefined;
  chain: import("@lifi/sdk").ExtendedChain | undefined;
  isLoading: boolean;
  isBalanceLoading: boolean;
  refetch: (
    options?: import("@tanstack/react-query").RefetchOptions,
  ) => Promise<
    import("@tanstack/react-query").QueryObserverResult<TokenAmount[], Error>
  >;
};
