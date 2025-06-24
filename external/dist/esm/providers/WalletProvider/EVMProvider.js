import { jsx as _jsx } from "react/jsx-runtime";
import { ChainType } from "@lifi/sdk";
import { useContext } from "react";
import { WagmiContext } from "wagmi";
import { isItemAllowed } from "../../utils/item.js";
import { useWidgetConfig } from "../WidgetProvider/WidgetProvider.js";
import { EVMBaseProvider } from "./EVMBaseProvider.js";
import { EVMExternalContext } from "./EVMExternalContext.js";
export function useInWagmiContext() {
  const { chains } = useWidgetConfig();
  const context = useContext(WagmiContext);
  return Boolean(context) && isItemAllowed(ChainType.EVM, chains?.types);
}
export const EVMProvider = ({ children }) => {
  const inWagmiContext = useInWagmiContext();
  return inWagmiContext
    ? _jsx(EVMExternalContext.Provider, {
        value: inWagmiContext,
        children: children,
      })
    : _jsx(EVMBaseProvider, { children: children });
};
//# sourceMappingURL=EVMProvider.js.map
