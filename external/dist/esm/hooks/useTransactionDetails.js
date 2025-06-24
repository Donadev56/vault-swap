import { getStatus } from "@lifi/sdk";
import { useAccount } from "@lifi/wallet-management";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { useWidgetConfig } from "../providers/WidgetProvider/WidgetProvider.js";
import { getQueryKey } from "../utils/queries.js";
export const useTransactionDetails = (transactionHash) => {
  const { account, accounts } = useAccount();
  const queryClient = useQueryClient();
  const { keyPrefix } = useWidgetConfig();
  const transactionHistoryQueryKey = useMemo(
    () => getQueryKey("transaction-history", keyPrefix),
    [keyPrefix],
  );
  const { data, isLoading } = useQuery({
    queryKey: [transactionHistoryQueryKey, transactionHash],
    queryFn: async ({ queryKey: [, transactionHash], signal }) => {
      if (transactionHash) {
        for (const account of accounts) {
          const cachedHistory = queryClient.getQueryData([
            transactionHistoryQueryKey,
            account.address,
          ]);
          const transaction = cachedHistory?.find(
            (t) => t.sending.txHash === transactionHash,
          );
          if (transaction) {
            return transaction;
          }
        }
        const transaction = await getStatus(
          {
            txHash: transactionHash,
          },
          { signal },
        );
        const fromAddress = transaction?.fromAddress;
        if (fromAddress) {
          queryClient.setQueryData(
            [transactionHistoryQueryKey, fromAddress],
            (data) => {
              return [...data, transaction];
            },
          );
        }
        return transaction;
      }
    },
    refetchInterval: 300000,
    enabled: account.isConnected && Boolean(transactionHash),
    initialData: () => {
      for (const account of accounts) {
        const transaction = queryClient
          .getQueryData([transactionHistoryQueryKey, account.address])
          ?.find((t) => t.sending.txHash === transactionHash);
        if (transaction) {
          return transaction;
        }
      }
    },
    placeholderData: keepPreviousData,
  });
  return {
    transaction: data,
    isLoading,
  };
};
//# sourceMappingURL=useTransactionDetails.js.map
