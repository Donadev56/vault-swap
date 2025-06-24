import type { RouteExtended } from "@lifi/sdk";
export declare const useToAddressRequirements: (route?: RouteExtended) => {
  requiredToAddress: boolean | undefined;
  requiredToChainType: import("@lifi/sdk").ChainType | undefined;
  accountNotDeployedAtDestination: boolean;
  accountDeployedAtDestination: boolean;
  toAddress: string | undefined;
  isFromContractAddress: boolean;
  isToContractAddress: boolean;
  isLoading: boolean;
  isFetched: boolean;
};
