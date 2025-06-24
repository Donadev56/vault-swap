import { ChainType, isBatchingSupported } from "@lifi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { getQueryKey } from "../utils/queries.js";
export function useIsBatchingSupported(chain, address) {
  const { keyPrefix } = useWidgetConfig();
  const enabled = Boolean(
    chain && chain.chainType === ChainType.EVM && !!address,
  );
  const { data, isLoading } = useQuery({
    queryKey: [
      getQueryKey("isBatchingSupported", keyPrefix),
      chain?.id,
      address,
    ],
    queryFn: () => {
      return isBatchingSupported({ chainId: chain.id });
    },
    enabled,
    staleTime: 3600000,
    retry: false,
  });
  return {
    isBatchingSupported: data,
    isBatchingSupportedLoading: enabled && isLoading,
  };
}
//# sourceMappingURL=useIsBatchingSupported.js.map
