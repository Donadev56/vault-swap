import { getToken } from "@lifi/sdk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { getQueryKey } from "../utils/queries.js";
export const useTokenSearch = (chainId, tokenQuery, enabled) => {
  const queryClient = useQueryClient();
  const { keyPrefix } = useWidgetConfig();
  const { data, isLoading } = useQuery({
    queryKey: [getQueryKey("token-search", keyPrefix), chainId, tokenQuery],
    queryFn: async ({ queryKey: [, chainId, tokenQuery], signal }) => {
      const token = await getToken(chainId, tokenQuery, {
        signal,
      });
      if (token) {
        queryClient.setQueriesData(
          { queryKey: [getQueryKey("tokens", keyPrefix)] },
          (data) => {
            if (
              data &&
              !data.tokens[chainId]?.some((t) => t.address === token.address)
            ) {
              const clonedData = { ...data };
              clonedData.tokens[chainId]?.push(token);
              return clonedData;
            }
          },
        );
      }
      return token;
    },
    enabled: Boolean(chainId && tokenQuery && enabled),
    retry: false,
  });
  return {
    token: data,
    isLoading,
  };
};
//# sourceMappingURL=useTokenSearch.js.map
