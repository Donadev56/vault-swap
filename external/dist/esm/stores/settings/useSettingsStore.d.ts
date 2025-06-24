import type { SettingsProps, SettingsState } from "./types.js";
export declare const defaultSlippage: undefined;
export declare const defaultConfigurableSettings: Pick<
  SettingsState,
  "routePriority" | "slippage" | "gasPrice"
>;
export declare const defaultSettings: SettingsProps;
export declare const useSettingsStore: import("zustand/traditional").UseBoundStoreWithEqualityFn<
  import("zustand").StoreApi<SettingsState>
>;
