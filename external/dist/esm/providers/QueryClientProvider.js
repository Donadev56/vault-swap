import { jsx as _jsx } from "react/jsx-runtime";
import {
  QueryClientContext as TanstackQueryClientContext,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { useContext } from "react";
import { queryClient } from "../config/queryClient";
export const QueryClientProvider = ({ children }) => {
  const existingQueryClient = useContext(TanstackQueryClientContext);
  return existingQueryClient
    ? children
    : _jsx(TanstackQueryClientProvider, {
        client: queryClient,
        children: children,
      });
};
//# sourceMappingURL=QueryClientProvider.js.map
