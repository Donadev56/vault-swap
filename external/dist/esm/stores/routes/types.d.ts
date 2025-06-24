import type { Route, RouteExtended } from "@lifi/sdk";
export interface RouteExecution {
  route: RouteExtended;
  status: RouteExecutionStatus;
}
export interface RouteExecutionState {
  routes: Partial<Record<string, RouteExecution>>;
  setExecutableRoute: (route: Route, observableRouteIds?: string[]) => void;
  updateRoute: (route: Route) => void;
  restartRoute: (routeId: string) => void;
  deleteRoute: (routeId: string) => void;
  deleteRoutes: (type: "completed" | "active") => void;
}
export declare enum RouteExecutionStatus {
  Idle = 1,
  Pending = 2,
  Done = 4,
  Failed = 8,
  Partial = 16,
  Refunded = 32,
}
