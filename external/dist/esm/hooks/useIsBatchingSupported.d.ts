import type { ExtendedChain } from "@lifi/sdk";
export declare function useIsBatchingSupported(
  chain?: ExtendedChain,
  address?: string,
): {
  isBatchingSupported: boolean | undefined;
  isBatchingSupportedLoading: boolean;
};
