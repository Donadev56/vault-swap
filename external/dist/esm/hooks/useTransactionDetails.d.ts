export declare const useTransactionDetails: (transactionHash?: string) => {
  transaction:
    | import("@lifi/sdk").StatusData
    | import("@lifi/sdk").FailedStatusData
    | undefined;
  isLoading: boolean;
};
