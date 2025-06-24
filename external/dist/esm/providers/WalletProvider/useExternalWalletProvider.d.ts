import { ChainType } from "@lifi/sdk";
interface ExternalWalletProvider {
  useExternalWalletProvidersOnly: boolean;
  externalChainTypes: ChainType[];
  internalChainTypes: ChainType[];
}
export declare function useExternalWalletProvider(): ExternalWalletProvider;
export {};
