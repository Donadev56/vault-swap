export declare const useToken: (
  chainId?: number,
  tokenAddress?: string,
) => {
  token: import("@lifi/sdk").Token | undefined;
  isLoading: boolean;
};
