export declare const useChain: (chainId?: number) => {
  chain: import("@lifi/sdk").ExtendedChain | undefined;
  isLoading: boolean;
  getChainById: import("./useAvailableChains.js").GetChainById;
};
