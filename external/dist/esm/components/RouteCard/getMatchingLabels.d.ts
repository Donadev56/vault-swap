import type { Route } from "@lifi/sdk";
import type { RouteLabel, RouteLabelRule } from "../../types/widget.js";
export declare const getMatchingLabels: (
  route: Route,
  routeLabels?: RouteLabelRule[],
) => RouteLabel[];
