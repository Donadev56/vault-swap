import { type Token, type TokenAmount } from "@lifi/sdk";
export declare const useTokenBalance: (
  accountAddress?: string,
  token?: Token,
) => {
  token: TokenAmount | undefined;
  isLoading: boolean;
  refetch: (
    options?: import("@tanstack/react-query").RefetchOptions,
  ) => Promise<
    import("@tanstack/react-query").QueryObserverResult<TokenAmount, Error>
  >;
  refetchNewBalance: () => void;
  getTokenBalancesWithRetry: (
    accountAddress: string,
    tokens: Token[],
    depth?: number,
  ) => Promise<TokenAmount[] | undefined>;
};
export declare const getTokenBalancesWithRetry: (
  accountAddress: string,
  tokens: Token[],
  depth?: number,
) => Promise<TokenAmount[] | undefined>;
