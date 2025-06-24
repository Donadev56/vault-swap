import { jsx as _jsx } from "react/jsx-runtime";
import { ChainType } from "@lifi/sdk";
import { SuiClientContext } from "@mysten/dapp-kit";
import { useContext } from "react";
import { isItemAllowed } from "../../utils/item.js";
import { useWidgetConfig } from "../WidgetProvider/WidgetProvider.js";
import { SuiBaseProvider } from "./SuiBaseProvider.js";
import { SuiExternalContext } from "./SuiExternalContext.js";
export function useInSuiContext() {
  const { chains } = useWidgetConfig();
  const context = useContext(SuiClientContext);
  return Boolean(context) && isItemAllowed(ChainType.MVM, chains?.types);
}
export const SuiProvider = ({ children }) => {
  const inSuiContext = useInSuiContext();
  return inSuiContext
    ? _jsx(SuiExternalContext.Provider, {
        value: inSuiContext,
        children: children,
      })
    : _jsx(SuiBaseProvider, { children: children });
};
//# sourceMappingURL=SuiProvider.js.map
