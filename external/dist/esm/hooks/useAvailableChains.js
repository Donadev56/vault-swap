import { ChainType, config, getChains } from "@lifi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { isItemAllowed } from "../utils/item.js";
import { getQueryKey } from "../utils/queries.js";
const supportedChainTypes = [
  ChainType.EVM,
  ChainType.SVM,
  ChainType.UTXO,
  ChainType.MVM,
];
export const useAvailableChains = (chainTypes) => {
  const { chains, keyPrefix } = useWidgetConfig();
  // const { providers } = useHasExternalWalletProvider();
  const { data, isLoading } = useQuery({
    queryKey: [
      getQueryKey("chains", keyPrefix),
      // providers,
      chains?.types,
      chains?.allow,
      chains?.deny,
      chains?.from,
      chains?.to,
    ],
    queryFn: async ({ queryKey: [, chainTypesConfig] }) => {
      const chainTypesRequest = supportedChainTypes
        // providers.length > 0 ? providers : supportedChainTypes
        .filter((chainType) => isItemAllowed(chainType, chainTypesConfig));
      const availableChains = await getChains({
        chainTypes: chainTypes || chainTypesRequest,
      });
      config.setChains(availableChains);
      return availableChains;
    },
    refetchInterval: 300000,
    staleTime: 300000,
  });
  const getChainById = useCallback(
    (chainId, chains = data) => {
      if (!chainId) {
        return;
      }
      const chain = chains?.find((chain) => chain.id === chainId);
      // if (!chain) {
      //   throw new Error('Chain not found or chainId is invalid.');
      // }
      return chain;
    },
    [data],
  );
  return {
    chains: data,
    getChainById,
    isLoading,
  };
};
//# sourceMappingURL=useAvailableChains.js.map
