import type { TokenAmount } from "../types/token.js";
export declare const useTokenAddressBalance: (
  chainId?: number,
  tokenAddress?: string,
) => {
  token: TokenAmount | undefined;
  chain: import("@lifi/sdk").ExtendedChain | undefined;
  isLoading: boolean;
  refetch: (
    options?: import("@tanstack/react-query").RefetchOptions,
  ) => Promise<
    import("@tanstack/react-query").QueryObserverResult<TokenAmount[], Error>
  >;
};
