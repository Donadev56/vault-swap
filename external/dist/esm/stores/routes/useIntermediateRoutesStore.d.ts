import type { Route } from "@lifi/sdk";
interface IntermediateRoutesState {
  intermediateRoutes: Record<string, Route[] | undefined>;
  setIntermediateRoutes: (
    key: readonly unknown[],
    routes: Route[] | undefined,
  ) => void;
  getIntermediateRoutes: (key: readonly unknown[]) => Route[] | undefined;
}
export declare const useIntermediateRoutesStore: import("zustand").UseBoundStore<
  import("zustand").StoreApi<IntermediateRoutesState>
>;
export {};
