import type { Chain } from "@lifi/sdk";
export type TransactionLinkProps = {
  chain?: Chain | number;
} & (
  | {
      txHash: string;
      txLink?: never;
    }
  | {
      txHash?: never;
      txLink: string;
    }
);
export declare const useExplorer: () => {
  getTransactionLink: ({
    txHash,
    txLink,
    chain,
  }: TransactionLinkProps) => string;
  getAddressLink: (address: string, chain?: Chain | number) => string;
};
