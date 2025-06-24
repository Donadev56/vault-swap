import { ChainType } from "@lifi/sdk";
import { useBytecode } from "wagmi";
export const useIsContractAddress = (address, chainId, chainType) => {
  const {
    data: contractCode,
    isLoading,
    isFetched,
  } = useBytecode({
    address: address,
    chainId: chainId,
    query: {
      refetchInterval: 300000,
      staleTime: 300000,
      enabled: chainType === ChainType.EVM && !!chainId && !!address,
    },
  });
  return {
    isContractAddress: !!contractCode,
    contractCode,
    isLoading,
    isFetched,
  };
};
//# sourceMappingURL=useIsContractAddress.js.map
