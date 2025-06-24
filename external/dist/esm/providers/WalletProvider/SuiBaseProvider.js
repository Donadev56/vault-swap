import { jsx as _jsx } from "react/jsx-runtime";
import { ChainId } from "@lifi/sdk";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { useMemo } from "react";
import { useAvailableChains } from "../../hooks/useAvailableChains.js";
export const SuiBaseProvider = ({ children }) => {
  const { chains } = useAvailableChains();
  const config = useMemo(() => {
    const sui = chains?.find((chain) => chain.id === ChainId.SUI);
    return createNetworkConfig({
      mainnet: { url: sui?.metamask?.rpcUrls[0] ?? getFullnodeUrl("mainnet") },
    });
  }, [chains]);
  return _jsx(SuiClientProvider, {
    networks: config.networkConfig,
    defaultNetwork: "mainnet",
    children: _jsx(WalletProvider, {
      storageKey: "li.fi-widget-sui-wallet-connection",
      autoConnect: true,
      children: children,
    }),
  });
};
//# sourceMappingURL=SuiBaseProvider.js.map
