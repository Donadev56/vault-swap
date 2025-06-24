import type { ChainType } from "@lifi/sdk";
import type { FormType } from "../stores/form/types.js";
export declare const useChains: (
  type?: FormType,
  chainTypes?: ChainType[],
) => {
  chains: import("@lifi/sdk").ExtendedChain[] | undefined;
  getChainById: import("./useAvailableChains.js").GetChainById;
  isLoading: boolean;
};
