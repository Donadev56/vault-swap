import { create } from "zustand";
export const useIntermediateRoutesStore = create((set, get) => ({
  intermediateRoutes: {},
  setIntermediateRoutes: (key, routes) => {
    const stringKey = JSON.stringify(key);
    // Create a new state with only the current key
    const newRoutesByKey = {};
    newRoutesByKey[stringKey] = routes;
    set({ intermediateRoutes: newRoutesByKey });
  },
  getIntermediateRoutes: (key) => {
    const stringKey = JSON.stringify(key);
    return get().intermediateRoutes[stringKey];
  },
}));
//# sourceMappingURL=useIntermediateRoutesStore.js.map
