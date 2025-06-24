import type { ExtendedChain } from "@lifi/sdk";
import { ChainType } from "@lifi/sdk";
export type GetChainById = (
  chainId?: number,
  chains?: ExtendedChain[],
) => ExtendedChain | undefined;
export declare const useAvailableChains: (chainTypes?: ChainType[]) => {
  chains: ExtendedChain[] | undefined;
  getChainById: GetChainById;
  isLoading: boolean;
};
