import { ChainType } from "@lifi/sdk";
export declare const useIsContractAddress: (
  address?: string,
  chainId?: number,
  chainType?: ChainType,
) => {
  isContractAddress: boolean;
  contractCode?: string;
  isLoading: boolean;
  isFetched: boolean;
};
