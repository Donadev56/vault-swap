import type { Route } from "@lifi/sdk";
interface RoutesProps {
  observableRoute?: Route;
}
export declare const useRoutes: ({ observableRoute }?: RoutesProps) => {
  routes: Route[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isFetched: boolean;
  dataUpdatedAt: number;
  refetchTime: number;
  refetch: (
    options?: import("@tanstack/react-query").RefetchOptions,
  ) => Promise<
    import("@tanstack/react-query").QueryObserverResult<
      Route[] | undefined,
      Error
    >
  >;
  fromChain: import("@lifi/sdk").ExtendedChain | undefined;
  toChain: import("@lifi/sdk").ExtendedChain | undefined;
  queryKey: readonly [
    string,
    string | undefined,
    number,
    string,
    string,
    string | undefined,
    number,
    string,
    string,
    import("@lifi/sdk").ContractCall[] | undefined,
    string | undefined,
    boolean,
    string[],
    string[],
    string[] | undefined,
    string[] | undefined,
    "RECOMMENDED" | "FASTEST" | "CHEAPEST" | "SAFEST" | undefined,
    import("../index.js").WidgetSubvariant | undefined,
    boolean | undefined,
    boolean,
    string | undefined,
    number | undefined,
    boolean,
    string | undefined,
  ];
  setReviewableRoute: (route: Route) => void;
};
export {};
