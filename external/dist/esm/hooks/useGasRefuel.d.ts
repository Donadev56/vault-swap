export declare const useGasRefuel: () => {
  enabled: boolean;
  availble: boolean | undefined;
  isLoading: boolean;
  chain: import("@lifi/sdk").ExtendedChain | undefined;
  fromAmount: string | undefined;
};
