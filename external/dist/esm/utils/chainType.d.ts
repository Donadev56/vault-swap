import { ChainId, ChainType } from "@lifi/sdk";
export declare const getChainTypeFromAddress: (
  address: string,
) => ChainType | undefined;
export declare const defaultChainIdsByType: {
  EVM: ChainId;
  SVM: ChainId;
  UTXO: ChainId;
  MVM: ChainId;
};
