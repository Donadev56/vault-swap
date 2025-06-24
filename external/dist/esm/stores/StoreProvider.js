import { jsx as _jsx } from "react/jsx-runtime";
import { BookmarkStoreProvider } from "./bookmarks/BookmarkStore.js";
import { ChainOrderStoreProvider } from "./chains/ChainOrderStore.js";
import { FormStoreProvider } from "./form/FormStore.js";
import { HeaderStoreProvider } from "./header/useHeaderStore.js";
import { RouteExecutionStoreProvider } from "./routes/RouteExecutionStore.js";
import { SplitSubvariantStoreProvider } from "./settings/useSplitSubvariantStore.js";
export const StoreProvider = ({ children, config, formRef }) => {
  return _jsx(SplitSubvariantStoreProvider, {
    state:
      config.subvariant === "split"
        ? config.subvariantOptions?.split || "swap"
        : undefined,
    children: _jsx(HeaderStoreProvider, {
      namePrefix: config?.keyPrefix,
      children: _jsx(BookmarkStoreProvider, {
        namePrefix: config?.keyPrefix,
        children: _jsx(FormStoreProvider, {
          formRef: formRef,
          children: _jsx(ChainOrderStoreProvider, {
            namePrefix: config?.keyPrefix,
            children: _jsx(RouteExecutionStoreProvider, {
              namePrefix: config?.keyPrefix,
              children: children,
            }),
          }),
        }),
      }),
    }),
  });
};
//# sourceMappingURL=StoreProvider.js.map
