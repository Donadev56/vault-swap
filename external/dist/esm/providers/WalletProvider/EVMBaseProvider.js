import { jsx as _jsx } from "react/jsx-runtime";
import {
  createDefaultWagmiConfig,
  useSyncWagmiConfig,
} from "@lifi/wallet-management";
import { useRef } from "react";
import { WagmiProvider } from "wagmi";
import { defaultCoinbaseConfig } from "../../config/coinbase.js";
import { defaultMetaMaskConfig } from "../../config/metaMask.js";
import { defaultWalletConnectConfig } from "../../config/walletConnect.js";
import { useAvailableChains } from "../../hooks/useAvailableChains.js";
import { useWidgetConfig } from "../WidgetProvider/WidgetProvider.js";
export const EVMBaseProvider = ({ children }) => {
  const { walletConfig } = useWidgetConfig();
  const { chains } = useAvailableChains();
  const wagmi = useRef(null);
  if (!wagmi.current) {
    wagmi.current = createDefaultWagmiConfig({
      coinbase: walletConfig?.coinbase ?? defaultCoinbaseConfig,
      metaMask: walletConfig?.metaMask ?? defaultMetaMaskConfig,
      walletConnect: walletConfig?.walletConnect ?? defaultWalletConnectConfig,
      wagmiConfig: {
        ssr: true,
      },
      lazy: true,
    });
  }
  useSyncWagmiConfig(wagmi.current.config, wagmi.current.connectors, chains);
  return _jsx(WagmiProvider, {
    config: wagmi.current.config,
    reconnectOnMount: false,
    children: children,
  });
};
//# sourceMappingURL=EVMBaseProvider.js.map
