import { jsx as _jsx } from "react/jsx-runtime";
import { BigmiContext } from "@bigmi/react";
import { ChainType } from "@lifi/sdk";
import { useContext } from "react";
import { isItemAllowed } from "../../utils/item.js";
import { useWidgetConfig } from "../WidgetProvider/WidgetProvider.js";
import { UTXOBaseProvider } from "./UTXOBaseProvider.js";
import { UTXOExternalContext } from "./UTXOExternalContext.js";
export function useInBigmiContext() {
  const { chains } = useWidgetConfig();
  const context = useContext(BigmiContext);
  return Boolean(context) && isItemAllowed(ChainType.UTXO, chains?.types);
}
export const UTXOProvider = ({ children }) => {
  const inBigmiContext = useInBigmiContext();
  return inBigmiContext
    ? _jsx(UTXOExternalContext.Provider, {
        value: inBigmiContext,
        children: children,
      })
    : _jsx(UTXOBaseProvider, { children: children });
};
//# sourceMappingURL=UTXOProvider.js.map
