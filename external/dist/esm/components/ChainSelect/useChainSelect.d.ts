import type { EVMChain } from "@lifi/sdk";
import type { FormType } from "../../stores/form/types.js";
export declare const useChainSelect: (formType: FormType) => {
  chainOrder: number[];
  chains: import("@lifi/sdk").ExtendedChain[] | undefined;
  getChains: () => EVMChain[];
  isLoading: boolean;
  setChainOrder: (chainId: number, type: FormType) => void;
  setCurrentChain: (chainId: number) => void;
};
