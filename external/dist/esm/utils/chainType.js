import { isUTXOAddress } from "@bigmi/core";
import { ChainId, ChainType, isSVMAddress } from "@lifi/sdk";
import { isValidSuiAddress } from "@mysten/sui/utils";
import { isAddress as isEVMAddress } from "viem";
const chainTypeAddressValidation = {
  [ChainType.EVM]: isEVMAddress,
  [ChainType.SVM]: isSVMAddress,
  [ChainType.MVM]: isValidSuiAddress,
  [ChainType.UTXO]: isUTXOAddress,
};
export const getChainTypeFromAddress = (address) => {
  for (const chainType in chainTypeAddressValidation) {
    const isChainType = chainTypeAddressValidation[chainType](address);
    if (isChainType) {
      return chainType;
    }
  }
};
export const defaultChainIdsByType = {
  [ChainType.EVM]: ChainId.ETH,
  [ChainType.SVM]: ChainId.SOL,
  [ChainType.UTXO]: ChainId.BTC,
  [ChainType.MVM]: ChainId.SUI,
};
//# sourceMappingURL=chainType.js.map
